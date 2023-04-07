import { type LoadEmployeeByEmailRepository, type HashComparer, type Encrypter, type UpdateAccessTokenRepository } from '@/data/protocols'
import { type Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadEmployeeByEmailRepository: LoadEmployeeByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.result> {
    const employee = await this.loadEmployeeByEmailRepository.loadByEmail(params.email)
    if (!employee) return null
    const isValid = await this.hashComparer.compare(params.password, employee.password)
    if (!isValid) return null
    const accessToken = await this.encrypter.encrypt(employee.id)
    await this.updateAccessTokenRepository.updateAccessToken(employee.id, accessToken)
    return {
      accessToken,
      name: employee.name
    }
  }
}
