import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'
import { type SignUpController } from '@/presentation/controllers'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Types, type Model } from 'mongoose'
import { type Employee as EmployeeModel } from '@/domain/models'
import { Employee } from '@/infra/db/mongodb/schemas'

let app: Express

const mockRequest = (): SignUpController.Params => ({
  name: 'name_value',
  email: 'any_mail@mail.com',
  password: 'password_value',
  passwordConfirmation: 'password_value',
  companyName: 'companyName_value',
  cnpj: 'cnpj_value',
  celPhone: 'celPhone_value'
})

let employeeCollection: Model<EmployeeModel>

describe('Login Routes', () => {
  beforeEach(async () => {
    app = await setupApp()
    employeeCollection = MongoHelper.getModel('Employee', Employee)
    await employeeCollection.deleteMany({})
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    it('should return 400 if no name is provided', async () => {
      const requestMocked = mockRequest()
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
      const requestMocked = mockRequest()
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
      const requestMocked = mockRequest()
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
      const requestMocked = mockRequest()
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
      const requestMocked = mockRequest()
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
      const requestMocked = mockRequest()
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
      const requestMocked = mockRequest()
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
  })
})
