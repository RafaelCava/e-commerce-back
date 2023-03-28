import { type LoadEmployeeByEmailRepository, type HashComparer, type Encrypter } from '../protocols'
import { type Authentication } from '../../domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadEmployeeByEmailRepository: LoadEmployeeByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.result> {
    const employee = await this.loadEmployeeByEmailRepository.loadByEmail(params.email)
    if (!employee) return null
    await this.hashComparer.compare(params.password, employee.password)
    await this.encrypter.encrypt(employee.id)
    return await Promise.resolve(null)
  }
}
