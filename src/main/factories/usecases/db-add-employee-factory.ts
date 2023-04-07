import { DbAddEmployee } from '@/data/usecases'
import { type AddEmployee } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/criptography'
import { EmployeeMongoRepository } from '@/infra/db/mongodb/repositories'

export const makeDbAddEmployee = (): AddEmployee => {
  const salt = 12
  return new DbAddEmployee(new EmployeeMongoRepository(), new BcryptAdapter(salt), new EmployeeMongoRepository())
}
