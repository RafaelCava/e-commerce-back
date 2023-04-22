import { type Authentication } from '@/domain/usecases'
import { type HttpResponse, type Controller } from '../protocols'
import { serverError } from '../helpers/http-helper'
import { ServerError } from '../errors'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}
  async handle (request: LoginController.Request): Promise<LoginController.Result> {
    try {
      await this.authentication.auth(request)
      return null
    } catch (error) {
      return serverError(new ServerError(error.stack))
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }

  export type Result = HttpResponse<Response | Error>

  type Response = {
    accessToken: string
    name: string
  }
}
