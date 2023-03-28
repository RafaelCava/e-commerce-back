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

describe('bcrypt adapter', () => {
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
  })
})
