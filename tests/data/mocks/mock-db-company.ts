import { type CheckCompanyByEmailRepository, type AddCompanyRepository } from '../../../src/data/protocols'
export const CheckCompanyByEmailRepositorySpy = (): CheckCompanyByEmailRepository => {
  class CheckCompanyByEmailRepositorySpy implements CheckCompanyByEmailRepository {
    async checkByEmail (email: string): Promise<CheckCompanyByEmailRepository.Result> {
      return await Promise.resolve(false)
    }
  }
  return new CheckCompanyByEmailRepositorySpy()
}

export const AddCompanyRepositorySpy = (): AddCompanyRepository => {
  class AddCompanyRepositorySpy implements AddCompanyRepository {
    async add (employee: AddCompanyRepository.Params): Promise<AddCompanyRepository.Result> {
      return await Promise.resolve({ id: 'any_id' })
    }
  }
  return new AddCompanyRepositorySpy()
}
