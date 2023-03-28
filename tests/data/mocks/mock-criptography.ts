import { type Hasher } from '../../../src/data/protocols'

export const HasherSpy = (): Hasher => {
  class HasherSpy implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_value')
    }
  }
  return new HasherSpy()
}
