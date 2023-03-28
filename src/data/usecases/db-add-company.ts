import { type CheckCompanyByEmailRepository } from '../protocols'
import { type AddCompany } from '../../domain/usecases'

export class DbAddCompany implements AddCompany {
  constructor (private readonly checkCompanyByEmailRepository: CheckCompanyByEmailRepository) {}
  async add (company: AddCompany.Params): Promise<AddCompany.Result> {
    await this.checkCompanyByEmailRepository.checkByEmail(company.email)
    return null
  }
}
