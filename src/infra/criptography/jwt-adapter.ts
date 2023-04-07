import { type Encrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'
export class JwtAdapter implements Encrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (value: string | object): Promise<string> {
    return jwt.sign({ value }, this.secretKey)
  }
}
