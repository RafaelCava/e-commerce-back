import { type CheckCompanyByEmailRepository } from '../../../src/data/protocols'
export const CheckCompanyByEmailRepositorySpy = (): CheckCompanyByEmailRepository => {
  class CheckCompanyByEmailRepositorySpy implements CheckCompanyByEmailRepository {
    async checkByEmail (email: string): Promise<CheckCompanyByEmailRepository.Result> {
      return await Promise.resolve(false)
    }
  }
  return new CheckCompanyByEmailRepositorySpy()
}
