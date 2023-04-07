import { type AddCompanyRepository } from '@/data/protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { Company } from '../schemas'

export class CompanyMongoRepository implements AddCompanyRepository {
  async add (company: AddCompanyRepository.Params): Promise<AddCompanyRepository.Result> {
    const companyCollection = MongoHelper.getModel('Company', Company)
    const companyCreated = await companyCollection.create(company)
    return Object.assign({}, { id: companyCreated.id })
  }
}
