import { DbAddCompany } from '../../../src/data/usecases'
import { CheckCompanyByEmailRepositorySpy, AddCompanyRepositorySpy } from './../mocks'
import { type CheckCompanyByEmailRepository, type AddCompanyRepository } from '../../../src/data/protocols'
import { mockAddCompanyParams, throwError } from '../../domain/mocks'
type SutTypes = {
  sut: DbAddCompany
  checkCompanyByEmailRepositorySpy: CheckCompanyByEmailRepository
  addCompanyRepositorySpy: AddCompanyRepository
}

const makeSut = (): SutTypes => {
  const checkCompanyByEmailRepositorySpy = CheckCompanyByEmailRepositorySpy()
  const addCompanyRepositorySpy = AddCompanyRepositorySpy()
  const sut = new DbAddCompany(checkCompanyByEmailRepositorySpy, addCompanyRepositorySpy)
  return {
    sut,
    checkCompanyByEmailRepositorySpy,
    addCompanyRepositorySpy
  }
}

describe('DbAddCompany UseCase', () => {
  describe('CheckCompanyByEmailRepository', () => {
    it('Should call CheckCompanyByEmailRepository with correct value', async () => {
      const { sut, checkCompanyByEmailRepositorySpy } = makeSut()
      const checkByEmailSpy = jest.spyOn(checkCompanyByEmailRepositorySpy, 'checkByEmail')
      await sut.add(mockAddCompanyParams())
      expect(checkByEmailSpy).toHaveBeenCalledTimes(1)
      expect(checkByEmailSpy).toHaveBeenCalledWith(mockAddCompanyParams().email)
    })

    it('Should throw if CheckCompanyByEmailRepository throws', async () => {
      const { sut, checkCompanyByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkCompanyByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddCompanyParams())
      await expect(promise).rejects.toThrow()
    })

    it('Should return null if CheckCompanyByEmailRepository returns true', async () => {
      const { sut, checkCompanyByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkCompanyByEmailRepositorySpy, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
      const isValid = await sut.add(mockAddCompanyParams())
      expect(isValid).toBeNull()
    })
  })

  describe('AddCompanyRepository', () => {
    it('Should call AddCompanyRepository with correct values', async () => {
      const { sut, addCompanyRepositorySpy } = makeSut()
      const addSpy = jest.spyOn(addCompanyRepositorySpy, 'add')
      await sut.add(mockAddCompanyParams())
      expect(addSpy).toHaveBeenCalledTimes(1)
      expect(addSpy).toHaveBeenCalledWith(mockAddCompanyParams())
    })

    it('Should throw if AddCompanyRepository throws', async () => {
      const { sut, addCompanyRepositorySpy } = makeSut()
      jest.spyOn(addCompanyRepositorySpy, 'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddCompanyParams())
      await expect(promise).rejects.toThrow()
    })

    it('Should return object with valid id if company are created', async () => {
      const { sut } = makeSut()
      const company = await sut.add(mockAddCompanyParams())
      expect(company).toBeTruthy()
      expect(company.id).toBe('any_id')
    })
  })
})
