import { type Hasher, type Encrypter } from '../../../src/data/protocols'

export const HasherSpy = (): Hasher => {
  class HasherSpy implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_value')
    }
  }
  return new HasherSpy()
}

export const EncrypterSpy = (): Encrypter => {
  class EncrypterSpy implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('encrypt_value')
    }
  }
  return new EncrypterSpy()
}
