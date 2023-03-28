import { type CheckEmployeeByEmailRepository, type AddEmployeeRepository } from '../protocols'

export const CheckEmployeeByEmailRepositorySpy = (): CheckEmployeeByEmailRepository => {
  class CheckEmployeeByEmailRepositorySpy implements CheckEmployeeByEmailRepository {
    async checkByEmail (email: string): Promise<boolean> {
      return await Promise.resolve(false)
    }
  }
  return new CheckEmployeeByEmailRepositorySpy()
}

export const AddEmployeeRepositorySpy = (): AddEmployeeRepository => {
  class AddEmployeeRepositorySpy implements AddEmployeeRepository {
    async add (employee: AddEmployeeRepository.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  return new AddEmployeeRepositorySpy()
}
