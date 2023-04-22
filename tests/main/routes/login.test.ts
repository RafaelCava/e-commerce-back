import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'
import { type LoginController, type SignUpController } from '@/presentation/controllers'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Types, type Model } from 'mongoose'
import { type Company as CompanyModel, type Employee as EmployeeModel } from '@/domain/models'
import { Company, Employee } from '@/infra/db/mongodb/schemas'

let app: Express

const mockRequestSignUp = (): SignUpController.Params => ({
  name: 'name_value',
  email: 'any_mail@mail.com',
  password: 'password_value',
  passwordConfirmation: 'password_value',
  companyName: 'companyName_value'
})

const mockRequestLogin = (): LoginController.Request => ({
  email: 'any_mail@mail.com',
  password: 'password_value'
})

let employeeCollection: Model<EmployeeModel>
let companyCollection: Model<CompanyModel>

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    app = await setupApp()
    employeeCollection = MongoHelper.getModel('Employee', Employee)
    await employeeCollection.deleteMany({})
    companyCollection = MongoHelper.getModel('Company', Company)
    await companyCollection.deleteMany({})
  })

  afterEach(async () => {
    employeeCollection = MongoHelper.getModel('Employee', Employee)
    await employeeCollection.deleteMany({})
    companyCollection = MongoHelper.getModel('Company', Company)
    await companyCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('should return 400 if no name is provided', async () => {
      const requestMocked = mockRequestSignUp()
      Reflect.deleteProperty(requestMocked, 'name')
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Missing param: name'
          })
        })
    })

    it('should return 400 if no email is provided', async () => {
      const requestMocked = mockRequestSignUp()
      Reflect.deleteProperty(requestMocked, 'email')
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Missing param: email'
          })
        })
    })

    it('should return 400 if invalid email is provided', async () => {
      const requestMocked = mockRequestSignUp()
      requestMocked.email = 'invalid_email'
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Invalid param: email'
          })
        })
    })

    it('should return 400 if no password is provided', async () => {
      const requestMocked = mockRequestSignUp()
      Reflect.deleteProperty(requestMocked, 'password')
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Missing param: password'
          })
        })
    })

    it('should return 400 if no passwordConfirmation is provided', async () => {
      const requestMocked = mockRequestSignUp()
      Reflect.deleteProperty(requestMocked, 'passwordConfirmation')
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Missing param: passwordConfirmation'
          })
        })
    })

    it('should return 400 if no company name is provided', async () => {
      const requestMocked = mockRequestSignUp()
      Reflect.deleteProperty(requestMocked, 'companyName')
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Missing param: companyName'
          })
        })
    })

    it('should return 403 if email are in use', async () => {
      const requestMocked = mockRequestSignUp()
      await employeeCollection.create({
        name: 'name_value',
        email: 'any_mail@mail.com',
        password: 'password_value',
        role: 'admin',
        company: new Types.ObjectId()
      })
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(403)
        .then(res => {
          expect(res.body).toEqual({
            error: 'The received email is already in use'
          })
        })
    })

    it('should return 200 with accessToken on succeeds', async () => {
      const requestMocked = mockRequestSignUp()
      await request(app)
        .post('/api/signup')
        .send(requestMocked)
        .expect(200)
        .then(res => {
          expect(res.body.accessToken).toBeTruthy()
          expect(res.body.name).toBe(requestMocked.name)
        })
    })
  })

  describe('POST /login', () => {
    it('should return 400 if no email is provided', async () => {
      const requestMocked = mockRequestLogin()
      Reflect.deleteProperty(requestMocked, 'email')
      await request(app)
        .post('/api/login')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Missing param: email'
          })
        })
    })

    it('should return 400 if no password is provided', async () => {
      const requestMocked = mockRequestLogin()
      Reflect.deleteProperty(requestMocked, 'password')
      await request(app)
        .post('/api/login')
        .send(requestMocked)
        .expect(400)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Missing param: password'
          })
        })
    })

    it('should return 401 if invalid credentials are provided', async () => {
      const requestMocked = mockRequestLogin()
      await request(app)
        .post('/api/login')
        .send(requestMocked)
        .expect(401)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Invalid credentials'
          })
        })
    })
  })
})
