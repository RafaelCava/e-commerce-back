import { type LoadEmployeeByEmailRepository } from '../protocols'
import { type Authentication } from '../../domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadEmployeeByEmailRepository: LoadEmployeeByEmailRepository) {}
  async auth (params: Authentication.Params): Promise<Authentication.result> {
    await this.loadEmployeeByEmailRepository.loadByEmail(params.email)
    return await Promise.resolve(null)
  }
}
