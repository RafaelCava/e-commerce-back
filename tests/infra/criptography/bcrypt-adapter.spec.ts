import { throwError } from './../../domain/mocks'
import { BcryptAdapter } from '../../../src/infra/criptography'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  },

  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const salt = 12

const makeSut = (salt: number): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    it('Should call hash with correct value', async () => {
      const sut = makeSut(salt)
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledTimes(1)
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a valid hash on hash success', async () => {
      const sut = makeSut(salt)
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })

    test('should throw if bcrypt throws', async () => {
      const sut = makeSut(salt)
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    it('Should call compare with correct values', async () => {
      const sut = makeSut(salt)
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    it('should return true when compare succeeds', async () => {
      const sut = makeSut(salt)
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    test('should return false when compare fails', async () => {
      const sut = makeSut(salt)
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false) as any)
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })
  })
})
