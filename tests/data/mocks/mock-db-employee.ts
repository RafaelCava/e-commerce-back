import { type CheckAccountByEmailRepository } from '../../../src/data/protocols/db/check-account-by-email-repository'

export const CheckAccountByEmailRepositorySpy = (): CheckAccountByEmailRepository => {
  class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    async checkByEmail (email: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new CheckAccountByEmailRepositorySpy()
}
