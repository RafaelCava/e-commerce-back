import { type LoadEmployeeByEmailRepository } from '../../../src/data/protocols'
export const LoadEmployeeByEmailRepositorySpy = (): LoadEmployeeByEmailRepository => {
  class LoadEmployeeByEmailRepositorySpy implements LoadEmployeeByEmailRepository {
    async loadByEmail (email: string): Promise<LoadEmployeeByEmailRepository.Result> {
      return await Promise.resolve({
        id: 'any_id',
        password: 'hashed_value'
      })
    }
  }
  return new LoadEmployeeByEmailRepositorySpy()
}
