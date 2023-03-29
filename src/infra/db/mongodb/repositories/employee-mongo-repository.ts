import { type AddEmployeeRepository } from '../../../../data/protocols/db'
export class EmployeeMongoRepository implements AddEmployeeRepository {
  async add (employee: AddEmployeeRepository.Params): Promise<boolean> {
    return await Promise.resolve(true)
  }
}
