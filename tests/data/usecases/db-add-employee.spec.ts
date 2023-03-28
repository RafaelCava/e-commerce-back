import { type CheckEmployeeByEmailRepository } from '../../../src/data/protocols'
import { mockAddEmployeeParams, throwError } from '../../domain/mocks'
import { DbAddEmployee } from '../../../src/data/usecases'
import { CheckEmployeeByEmailRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbAddEmployee
  checkEmployeeByEmailRepositorySpy: CheckEmployeeByEmailRepository
}

const makeSut = (): SutTypes => {
  const checkEmployeeByEmailRepositorySpy = CheckEmployeeByEmailRepositorySpy()
  const sut = new DbAddEmployee(checkEmployeeByEmailRepositorySpy)
  return {
    sut,
    checkEmployeeByEmailRepositorySpy
  }
}

describe('DbAddAccount UseCase', () => {
  describe('CheckEmployeeByEmailRepository', () => {
    it('Should call CheckEmployeeByEmailRepository with correct value', async () => {
      const { sut, checkEmployeeByEmailRepositorySpy } = makeSut()
      const checkByEmailSpy = jest.spyOn(checkEmployeeByEmailRepositorySpy, 'checkByEmail')
      await sut.add(mockAddEmployeeParams())
      expect(checkByEmailSpy).toHaveBeenCalledTimes(1)
      expect(checkByEmailSpy).toHaveBeenCalledWith(mockAddEmployeeParams().email)
    })

    it('Should throw if CheckEmployeeByEmailRepository throws', async () => {
      const { sut, checkEmployeeByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkEmployeeByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
      const result = sut.add(mockAddEmployeeParams())
      await expect(result).rejects.toThrow()
    })
  })
})
