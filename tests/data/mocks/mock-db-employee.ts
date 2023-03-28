import { type CheckEmployeeByEmailRepository } from '../protocols/db/check-employee-by-email-repository'

export const CheckEmployeeByEmailRepositorySpy = (): CheckEmployeeByEmailRepository => {
  class CheckEmployeeByEmailRepositorySpy implements CheckEmployeeByEmailRepository {
    async checkByEmail (email: string): Promise<boolean> {
      return await Promise.resolve(false)
    }
  }
  return new CheckEmployeeByEmailRepositorySpy()
}
