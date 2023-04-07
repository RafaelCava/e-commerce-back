import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { CompanyMongoRepository } from '@/infra/db/mongodb/repositories'
import { Company } from '@/infra/db/mongodb/schemas'
import { type Company as CompanyModel } from '@/domain/models'
import MockDate from 'mockdate'
import { type Model } from 'mongoose'
import { throwError } from '@/tests/domain/mocks'

let companyCollection: Model<CompanyModel>

const makeSut = (): CompanyMongoRepository => {
  return new CompanyMongoRepository()
}

const mockCompany = {
  name: 'any_name',
  email: 'any_mail@mail.com',
  plan: 'trial',
  active: true
}

describe('Company Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    MockDate.set(new Date())
    companyCollection = MongoHelper.getModel('Company', Company)
    await companyCollection.deleteMany({})
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('add()', () => {
    it('Should return Company with id on add success', async () => {
      const sut = makeSut()
      const company = await sut.add(mockCompany)
      expect(company).toBeTruthy()
      expect(company.id).toBeTruthy()
    })

    it('Should throws if mongoose throws', async () => {
      const sut = makeSut()
      const mockCompany = {
        name: 'any_name',
        email: 'any_mail@mail.com',
        plan: 'trial',
        active: true
      }
      jest.spyOn(companyCollection, 'create').mockImplementationOnce(throwError)
      const promise = sut.add(mockCompany)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('checkByEmail()', () => {
    it('Should return true if email exists', async () => {
      const sut = makeSut()
      await companyCollection.create(mockCompany)
      const exists = await sut.checkByEmail(mockCompany.email)
      expect(exists).toBe(true)
    })
  })
})
