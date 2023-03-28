import { DbAddCompany } from '../../../src/data/usecases'
import { CheckCompanyByEmailRepositorySpy } from './../mocks'
import { type CheckCompanyByEmailRepository } from '../../../src/data/protocols'
import { mockAddCompanyParams, throwError } from '../../domain/mocks'
type SutTypes = {
  sut: DbAddCompany
  checkCompanyByEmailRepositorySpy: CheckCompanyByEmailRepository
}

const makeSut = (): SutTypes => {
  const checkCompanyByEmailRepositorySpy = CheckCompanyByEmailRepositorySpy()
  const sut = new DbAddCompany(checkCompanyByEmailRepositorySpy)
  return {
    sut,
    checkCompanyByEmailRepositorySpy
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
  })
})
