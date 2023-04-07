import { type Hasher, type HashComparer } from '@/data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
