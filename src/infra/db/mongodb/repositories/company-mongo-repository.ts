import { type CheckCompanyByEmailRepository, type AddCompanyRepository } from '@/data/protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { Company } from '../schemas'

export class CompanyMongoRepository implements AddCompanyRepository, CheckCompanyByEmailRepository {
  async add (company: AddCompanyRepository.Params): Promise<AddCompanyRepository.Result> {
    const companyCollection = MongoHelper.getModel('Company', Company)
    const companyCreated = await companyCollection.create(company)
    return Object.assign({}, { id: companyCreated.id })
  }

  async checkByEmail (email: string): Promise<boolean> {
    const companyCollection = MongoHelper.getModel('Company', Company)
    return !!(await companyCollection.findOne({ email }).lean())
  }
}
