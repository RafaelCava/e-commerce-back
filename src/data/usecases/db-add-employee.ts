import { type CheckAccountByEmailRepository } from '../protocols'
import { type AddEmployee } from '../../domain/usecases'

export class DbAddEmployee implements AddEmployee {
  constructor (private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}
  async add (account: AddEmployee.Params): Promise<boolean> {
    await this.checkAccountByEmailRepository.checkByEmail(account.email)
    return null
  }
}
