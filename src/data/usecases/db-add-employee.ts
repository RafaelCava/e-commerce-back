import { type CheckEmployeeByEmailRepository, type Hasher, type AddEmployeeRepository } from '@/data/protocols'
import { type AddEmployee } from '@/domain/usecases'

export class DbAddEmployee implements AddEmployee {
  constructor (
    private readonly checkAccountByEmailRepository: CheckEmployeeByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addEmployeeRepository: AddEmployeeRepository
  ) {}

  async add (employee: AddEmployee.Params): Promise<AddEmployee.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(employee.email)
    if (exists) return false
    const hashedValue = await this.hasher.hash(employee.password)
    employee.password = hashedValue
    return await this.addEmployeeRepository.add(employee)
  }
}
