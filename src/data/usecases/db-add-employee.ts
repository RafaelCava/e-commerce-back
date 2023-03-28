import { type CheckEmployeeByEmailRepository } from '../protocols'
import { type AddEmployee } from '../../domain/usecases'

export class DbAddEmployee implements AddEmployee {
  constructor (private readonly checkAccountByEmailRepository: CheckEmployeeByEmailRepository) {}
  async add (account: AddEmployee.Params): Promise<AddEmployee.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(account.email)
    if (exists) return false
    return null
  }
}
