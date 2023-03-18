import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type EmailValidator,
  type AddAccount,
  type Authentication
} from './signup-protocols'
import { MissingParamError, InvalidParamError, ServerError, EmailInUseError } from '../../../errors'
import { badRequest, forbidden, serverError, ok } from '../../../helpers/http-helper'
export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest<SignUpController.Request>): Promise<HttpResponse<SignUpController.Response>> {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password, passwordConfirmation, name } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({ email, password, name })
      if (!account) return forbidden(new EmailInUseError())
      const authenticationResult = await this.authentication.auth({
        email,
        password
      })
      return ok(authenticationResult)
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }

  export type Response = Authentication.result | Error
}
