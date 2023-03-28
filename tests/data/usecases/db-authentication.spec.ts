import { mockAuthenticationParams, throwError } from './../../domain/mocks'
import { type LoadEmployeeByEmailRepository, type HashComparer } from '../../../src/data/protocols'
import { DbAuthentication } from '../../../src/data/usecases'
import { LoadEmployeeByEmailRepositorySpy, HashComparerSpy } from '../mocks'
type SutTypes = {
  sut: DbAuthentication
  loadEmployeeByEmailRepositorySpy: LoadEmployeeByEmailRepository
  hashComparerSpy: HashComparer
}

const makeSut = (): SutTypes => {
  const loadEmployeeByEmailRepositorySpy = LoadEmployeeByEmailRepositorySpy()
  const hashComparerSpy = HashComparerSpy()
  const sut = new DbAuthentication(loadEmployeeByEmailRepositorySpy, hashComparerSpy)
  return {
    sut,
    loadEmployeeByEmailRepositorySpy,
    hashComparerSpy
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

    it('Should return null if LoadEmployeeByEmailRepository returns null', async () => {
      const { sut, loadEmployeeByEmailRepositorySpy } = makeSut()
      jest.spyOn(loadEmployeeByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
      const auth = await sut.auth(mockAuthenticationParams())
      expect(auth).toBeNull()
    })
  })

  describe('HashComparer', () => {
    it('Should call HashComparer with correct values', async () => {
      const { sut, hashComparerSpy } = makeSut()
      const compareSpy = jest.spyOn(hashComparerSpy, 'compare')
      await sut.auth(mockAuthenticationParams())
      expect(compareSpy).toHaveBeenCalledTimes(1)
      expect(compareSpy).toHaveBeenCalledWith(mockAuthenticationParams().password, 'hashed_value')
    })
  })
})
