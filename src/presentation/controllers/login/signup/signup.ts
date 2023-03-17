import { type AddAccountRequest } from '../../../../domain/models/add-account-request'
import { type Controller, type HttpRequest, type HttpResponse, type EmailValidator } from '../../../protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../../errors'
import { badRequest, serverError } from '../../../helpers/http-helper'
export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  async handle (httpRequest: HttpRequest<AddAccountRequest>): Promise<HttpResponse<Error> | null> {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError('email'))
      }
      return await Promise.resolve(null)
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
