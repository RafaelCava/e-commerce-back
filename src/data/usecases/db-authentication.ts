import { type LoadEmployeeByEmailRepository, type HashComparer } from '../protocols'
import { type Authentication } from '../../domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadEmployeeByEmailRepository: LoadEmployeeByEmailRepository, private readonly hashComparer: HashComparer) {}
  async auth (params: Authentication.Params): Promise<Authentication.result> {
    const employee = await this.loadEmployeeByEmailRepository.loadByEmail(params.email)
    if (!employee) return null
    await this.hashComparer.compare(params.password, employee.password)
    return await Promise.resolve(null)
  }
}
