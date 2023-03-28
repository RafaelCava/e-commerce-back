import { BcryptAdapter } from '../../../src/infra/criptography'
import bcrypt from 'bcrypt'

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
  })
})
