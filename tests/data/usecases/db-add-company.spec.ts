import { DbAddCompany } from '../../../src/data/usecases'
import { CheckCompanyByEmailRepositorySpy } from './../mocks'
import { type CheckCompanyByEmailRepository } from '../../../src/data/protocols'
import { mockAddCompanyParams } from '../../domain/mocks'
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
  describe('CheckCompanyByEmail', () => {
    it('Should call CheckCompanyByEmail with correct value', async () => {
      const { sut, checkCompanyByEmailRepositorySpy } = makeSut()
      const checkByEmailSpy = jest.spyOn(checkCompanyByEmailRepositorySpy, 'checkByEmail')
      await sut.add(mockAddCompanyParams())
      expect(checkByEmailSpy).toHaveBeenCalledTimes(1)
      expect(checkByEmailSpy).toHaveBeenCalledWith(mockAddCompanyParams().email)
    })
  })
})
