import { type CheckAccountByEmailRepository } from '../../../src/data/protocols'
import { mockAddEmployeeParams } from '../../domain/mocks'
import { DbAddEmployee } from '../../../src/data/usecases'
import { CheckAccountByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbAddEmployee
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = CheckAccountByEmailRepositorySpy()
  const sut = new DbAddEmployee(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount UseCase', () => {
  describe('CheckAccountByEmailRepository', () => {
    it('Should call CheckAccountByEmailRepository with correct value', async () => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      const checkByEmailSpy = jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      await sut.add(mockAddEmployeeParams())
      expect(checkByEmailSpy).toHaveBeenCalledTimes(1)
      expect(checkByEmailSpy).toHaveBeenCalledWith(mockAddEmployeeParams().email)
    })
  })
})
