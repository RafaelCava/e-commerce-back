import { type CheckEmployeeByEmailRepository, type Hasher } from '../protocols'
import { type AddEmployee } from '../../domain/usecases'

export class DbAddEmployee implements AddEmployee {
  constructor (private readonly checkAccountByEmailRepository: CheckEmployeeByEmailRepository, private readonly hasher: Hasher) {}
  async add (employee: AddEmployee.Params): Promise<AddEmployee.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(employee.email)
    if (exists) return false
    await this.hasher.hash(employee.password)
    return null
  }
}
