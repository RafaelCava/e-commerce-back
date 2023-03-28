import { mockAuthenticationParams, throwError } from '../../domain/mocks'
import { type LoadEmployeeByEmailRepository, type HashComparer, type Encrypter } from '../../../src/data/protocols'
import { DbAuthentication } from '../../../src/data/usecases'
import { LoadEmployeeByEmailRepositorySpy, HashComparerSpy, EncrypterSpy } from '../mocks'
type SutTypes = {
  sut: DbAuthentication
  loadEmployeeByEmailRepositorySpy: LoadEmployeeByEmailRepository
  hashComparerSpy: HashComparer
  encrypterSpy: Encrypter
}

const makeSut = (): SutTypes => {
  const loadEmployeeByEmailRepositorySpy = LoadEmployeeByEmailRepositorySpy()
  const hashComparerSpy = HashComparerSpy()
  const encrypterSpy = EncrypterSpy()
  const sut = new DbAuthentication(loadEmployeeByEmailRepositorySpy, hashComparerSpy, encrypterSpy)
  return {
    sut,
    loadEmployeeByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
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

    it('Should throw if HashComparer throws', async () => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
      const result = sut.auth(mockAuthenticationParams())
      await expect(result).rejects.toThrow()
    })

    it('Should return null if HashComparer returns false', async () => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const auth = await sut.auth(mockAuthenticationParams())
      expect(auth).toBeNull()
    })
  })

  describe('Encrypter', () => {
    it('Should call Encrypter with correct value', async () => {
      const { sut, encrypterSpy } = makeSut()
      const encryptSpy = jest.spyOn(encrypterSpy, 'encrypt')
      await sut.auth(mockAuthenticationParams())
      expect(encryptSpy).toHaveBeenCalledTimes(1)
      expect(encryptSpy).toHaveBeenCalledWith('any_id')
    })
  })
})
