import { JwtAdapter } from '../../../src/infra/criptography'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve('encrypted_value')
  }
}))

const secretKey = 'any_key'

const makeSut = (secretKey: string): JwtAdapter => {
  return new JwtAdapter(secretKey)
}

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    it('should call encrypt with correct values', async () => {
      const sut = makeSut(secretKey)
      const encryptSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(encryptSpy).toHaveBeenCalledTimes(1)
      expect(encryptSpy).toHaveBeenCalledWith('any_value', secretKey)
    })

    it('should return encrypt value if encrypt succeeds', async () => {
      const sut = makeSut(secretKey)
      const encryptValue = await sut.encrypt('any_value')
      expect(encryptValue).toBe('encrypted_value')
    })
  })
})
