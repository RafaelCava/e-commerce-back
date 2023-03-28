import { type CheckEmployeeByEmailRepository, type Hasher, type AddEmployeeRepository } from '../../../src/data/protocols'
import { mockAddEmployeeParams, throwError } from '../../domain/mocks'
import { DbAddEmployee } from '../../../src/data/usecases'
import { CheckEmployeeByEmailRepositorySpy, HasherSpy, AddEmployeeRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbAddEmployee
  checkEmployeeByEmailRepositorySpy: CheckEmployeeByEmailRepository
  hasherSpy: Hasher
  addEmployeeRepositorySpy: AddEmployeeRepository
}

const makeSut = (): SutTypes => {
  const checkEmployeeByEmailRepositorySpy = CheckEmployeeByEmailRepositorySpy()
  const hasherSpy = HasherSpy()
  const addEmployeeRepositorySpy = AddEmployeeRepositorySpy()
  const sut = new DbAddEmployee(checkEmployeeByEmailRepositorySpy, hasherSpy, addEmployeeRepositorySpy)
  return {
    sut,
    checkEmployeeByEmailRepositorySpy,
    hasherSpy,
    addEmployeeRepositorySpy
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

  describe('AddEmployeeRepository', () => {
    it('Should call AddEmployeeRepository with correct values', async () => {
      const { sut, addEmployeeRepositorySpy } = makeSut()
      const addSpy = jest.spyOn(addEmployeeRepositorySpy, 'add')
      const mockParams = mockAddEmployeeParams()
      await sut.add(mockParams)
      mockParams.password = 'hashed_value'
      expect(addSpy).toHaveBeenCalledTimes(1)
      expect(addSpy).toHaveBeenCalledWith(mockParams)
    })

    it('Should throw if AddEmployeeRepository throws', async () => {
      const { sut, addEmployeeRepositorySpy } = makeSut()
      jest.spyOn(addEmployeeRepositorySpy, 'add').mockImplementationOnce(throwError)
      const result = sut.add(mockAddEmployeeParams())
      await expect(result).rejects.toThrow()
    })

    it('Should return true if employee are created', async () => {
      const { sut } = makeSut()
      const result = await sut.add(mockAddEmployeeParams())
      expect(result).toBe(true)
    })
  })
})
