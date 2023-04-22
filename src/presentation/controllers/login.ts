import { type Authentication } from '@/domain/usecases'
import { type HttpResponse, type Controller } from '../protocols'
import { ok, serverError, unauthorized } from '../helpers/http-helper'
import { ServerError, UnauthorizedError } from '../errors'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}
  async handle (request: LoginController.Request): Promise<LoginController.Result> {
    try {
      const auth = await this.authentication.auth(request)
      if (!auth) {
        return unauthorized(new UnauthorizedError())
      }
      return ok(auth)
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
