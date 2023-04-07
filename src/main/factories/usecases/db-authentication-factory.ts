import { DbAuthentication } from '@/data/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/repositories'
import env from '@/main/config/env'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  return new DbAuthentication(new EmployeeMongoRepository(), new BcryptAdapter(salt), new JwtAdapter(env.jwtSecret), new EmployeeMongoRepository())
}
