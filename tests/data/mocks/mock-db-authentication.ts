import { type LoadEmployeeByEmailRepository, type HashComparer } from '../../../src/data/protocols'
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

export const HashComparerSpy = (): HashComparer => {
  class HashComparerSpy implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashComparerSpy()
}
