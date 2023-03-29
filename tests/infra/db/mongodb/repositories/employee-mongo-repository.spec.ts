import { type Employee as EmployeeModel } from '../../../../../src/domain/models'
import { Employee } from '../../../../../src/infra/db/mongodb/schemas'
import { EmployeeMongoRepository } from './../../../../../src/infra/db/mongodb/repositories'
import { mockAddEmployeeParams } from '../../../../domain/mocks'
import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers/mongo-helper'
import { type Model } from 'mongoose'

let employeeCollection: Model<EmployeeModel>

const makeSut = (): EmployeeMongoRepository => {
  return new EmployeeMongoRepository()
}

describe('Employee Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    employeeCollection = MongoHelper.getModel('Employee', Employee)
    await employeeCollection.deleteMany({})
  })

  describe('add()', () => {
    it('Should return true on add success', async () => {
      const sut = makeSut()
      const addEmployeeParams = mockAddEmployeeParams()
      const isCreated = await sut.add(addEmployeeParams)
      expect(isCreated).toBe(true)
    })
  })
})
