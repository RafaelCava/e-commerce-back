import { mockEmployee } from '../../domain/mocks/mock-employee'
import { type LoadEmployeeByEmailRepository, type HashComparer, type UpdateAccessTokenRepository } from '../../../src/data/protocols'
export const LoadEmployeeByEmailRepositorySpy = (): LoadEmployeeByEmailRepository => {
  class LoadEmployeeByEmailRepositorySpy implements LoadEmployeeByEmailRepository {
    async loadByEmail (email: string): Promise<LoadEmployeeByEmailRepository.Result> {
      return await Promise.resolve(mockEmployee())
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

export const UpdateAccessTokenRepositorySpy = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {}
  }
  return new UpdateAccessTokenRepositorySpy()
}
