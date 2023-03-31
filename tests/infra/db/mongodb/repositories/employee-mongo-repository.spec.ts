import { type Employee as EmployeeModel } from '../../../../../src/domain/models'
import { Employee } from '../../../../../src/infra/db/mongodb/schemas'
import { EmployeeMongoRepository } from './../../../../../src/infra/db/mongodb/repositories'
import { mockAddEmployeeParams, mockEmployee, throwError } from '../../../../domain/mocks'
import { MongoHelper } from '../../../../../src/infra/db/mongodb/helpers/mongo-helper'
import { type Model, Types } from 'mongoose'

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
      addEmployeeParams.company = String(new Types.ObjectId())
      const isCreated = await sut.add(addEmployeeParams)
      const employee = await employeeCollection.findOne({ email: addEmployeeParams.email }, { _id: 1 })
      expect(isCreated).toBe(true)
      expect(employee).toBeTruthy()
    })
  })

  describe('checkByEmail()', () => {
    it('Should return true if email is already in use', async () => {
      const sut = makeSut()
      const addEmployeeParams = mockAddEmployeeParams()
      addEmployeeParams.company = String(new Types.ObjectId())
      await employeeCollection.create(addEmployeeParams)
      const isEmailInUse = await sut.checkByEmail(addEmployeeParams.email)
      expect(isEmailInUse).toBe(true)
    })

    it('Should return false if email is not use', async () => {
      const sut = makeSut()
      const isEmailInUse = await sut.checkByEmail('any_mail@mail.com')
      expect(isEmailInUse).toBe(false)
    })

    it('Should throws if checkByEmail throws', async () => {
      const sut = makeSut()
      jest.spyOn(employeeCollection, 'findOne').mockImplementationOnce(throwError)
      const promise = sut.checkByEmail('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByEmail()', () => {
    it('Should return null if email is not use', async () => {
      const sut = makeSut()
      const employee = await sut.loadByEmail('any_mail@mail.com')
      expect(employee).toBeNull()
    })

    it('Should return Employee on succeed', async () => {
      const sut = makeSut()
      const employeeMocked = mockEmployee()
      employeeMocked.company = String(new Types.ObjectId())
      let employeeCreated = await employeeCollection.create(employeeMocked)
      employeeCreated = MongoHelper.map(employeeCreated.toObject())
      const employee = await sut.loadByEmail(employeeMocked.email)
      expect(employee).toEqual(employeeCreated)
    })

    it('Should throws if loadByEmail throws', async () => {
      const sut = makeSut()
      jest.spyOn(employeeCollection, 'findOne').mockImplementationOnce(throwError)
      const promise = sut.loadByEmail('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
