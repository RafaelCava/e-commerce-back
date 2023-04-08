import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { setupApp } from '@/main/config/app'
import request from 'supertest'
import { type Express } from 'express'

let app: Express

describe('Health Check Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    app = await setupApp()
  })

  describe('GET /health', () => {
    it('should return 200 if server is up', async () => {
      await request(app)
        .get('/api/health')
        .expect(200)
        .then(res => {
          expect(res.body).toEqual({
            message: 'Server is running'
          })
        })
    })

    it('should return 500 if server down or broken', async () => {
      await MongoHelper.disconnect()
      await request(app)
        .get('/api/health')
        .expect(500)
        .then(res => {
          expect(res.body).toEqual({
            error: 'Internal error'
          })
        })
    })
  })
})
