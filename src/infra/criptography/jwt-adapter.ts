import { type Encrypter } from '../../data/protocols'
import jwt from 'jsonwebtoken'
export class JwtAdapter implements Encrypter {
  constructor (private readonly secretKey: string) {}

  async encrypt (value: string): Promise<string> {
    return await Promise.resolve(jwt.sign(value, this.secretKey))
  }
}
