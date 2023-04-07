import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'
import { type SignUpController } from '@/presentation/controllers'

let app: Express

const mockRequest = (): SignUpController.Params => ({
  name: 'name_value',
  email: 'email_value',
  password: 'password_value',
  passwordConfirmation: 'password_value',
  companyName: 'companyName_value',
  cnpj: 'cnpj_value',
  celPhone: 'celPhone_value'
})

describe('Login Routes', () => {
  beforeEach(async () => {
    app = await setupApp()
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
  })
})
