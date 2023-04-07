import { type CheckCompanyByEmailRepository, type AddCompanyRepository } from '@/data/protocols'
import { type AddCompany } from '@/domain/usecases'

export class DbAddCompany implements AddCompany {
  constructor (private readonly checkCompanyByEmailRepository: CheckCompanyByEmailRepository, private readonly addCompanyRepository: AddCompanyRepository) {}
  async add (company: AddCompany.Params): Promise<AddCompany.Result> {
    const exists = await this.checkCompanyByEmailRepository.checkByEmail(company.email)
    if (exists) return null
    return await this.addCompanyRepository.add(company)
  }
}
