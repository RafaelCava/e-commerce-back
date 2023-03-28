import { type CheckEmployeeByEmailRepository, type Hasher } from '../../../src/data/protocols'
import { mockAddEmployeeParams, throwError } from '../../domain/mocks'
import { DbAddEmployee } from '../../../src/data/usecases'
import { CheckEmployeeByEmailRepositorySpy, HasherSpy } from '../mocks'

type SutTypes = {
  sut: DbAddEmployee
  checkEmployeeByEmailRepositorySpy: CheckEmployeeByEmailRepository
  hasherSpy: Hasher
}

const makeSut = (): SutTypes => {
  const checkEmployeeByEmailRepositorySpy = CheckEmployeeByEmailRepositorySpy()
  const hasherSpy = HasherSpy()
  const sut = new DbAddEmployee(checkEmployeeByEmailRepositorySpy, hasherSpy)
  return {
    sut,
    checkEmployeeByEmailRepositorySpy,
    hasherSpy
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

    it('Should return false if CheckEmployeeByEmailRepository returns true', async () => {
      const { sut, checkEmployeeByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkEmployeeByEmailRepositorySpy, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
      const isValid = await sut.add(mockAddEmployeeParams())
      expect(isValid).toBe(false)
    })
  })

  describe('Hasher', () => {
    it('Should call Hasher with correct value', async () => {
      const { sut, hasherSpy } = makeSut()
      const hashSpy = jest.spyOn(hasherSpy, 'hash')
      await sut.add(mockAddEmployeeParams())
      expect(hashSpy).toHaveBeenCalledTimes(1)
      expect(hashSpy).toHaveBeenCalledWith(mockAddEmployeeParams().password)
    })

    it('Should throw if Hasher throws', async () => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
      const result = sut.add(mockAddEmployeeParams())
      await expect(result).rejects.toThrow()
    })
  })
})
