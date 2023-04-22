import { type Authentication } from '@/domain/usecases'
import { type HttpResponse, type Controller } from '../protocols'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}
  async handle (request: LoginController.Request): Promise<LoginController.Result> {
    await this.authentication.auth(request)
    return null
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }

  export type Result = HttpResponse<Response>

  type Response = {
    accessToken: string
    name: string
  }
}
