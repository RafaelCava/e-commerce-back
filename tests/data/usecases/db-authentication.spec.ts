import { mockAuthenticationParams, throwError } from './../../domain/mocks'
import { type LoadEmployeeByEmailRepository } from '../../../src/data/protocols'
import { DbAuthentication } from '../../../src/data/usecases'
import { LoadEmployeeByEmailRepositorySpy } from '../mocks'
type SutTypes = {
  sut: DbAuthentication
  loadEmployeeByEmailRepositorySpy: LoadEmployeeByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadEmployeeByEmailRepositorySpy = LoadEmployeeByEmailRepositorySpy()
  const sut = new DbAuthentication(loadEmployeeByEmailRepositorySpy)
  return {
    sut,
    loadEmployeeByEmailRepositorySpy
  }
}

describe('DbAuthentication', () => {
  describe('LoadEmployeeByEmailRepository', () => {
    it('Should call LoadEmployeeByEmailRepository with correct value', async () => {
      const { sut, loadEmployeeByEmailRepositorySpy } = makeSut()
      const loadByEmailSpy = jest.spyOn(loadEmployeeByEmailRepositorySpy, 'loadByEmail')
      await sut.auth(mockAuthenticationParams())
      expect(loadByEmailSpy).toHaveBeenCalledTimes(1)
      expect(loadByEmailSpy).toHaveBeenCalledWith(mockAuthenticationParams().email)
    })

    it('Should throw if LoadEmployeeByEmailRepository throws', async () => {
      const { sut, loadEmployeeByEmailRepositorySpy } = makeSut()
      jest.spyOn(loadEmployeeByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
      const result = sut.auth(mockAuthenticationParams())
      await expect(result).rejects.toThrow()
    })
  })
})
