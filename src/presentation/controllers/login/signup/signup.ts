import { type AddAccount } from '../../../../domain/usecases/account/add-account'
import { type AddAccountRequest } from '../../../dto/add-account-request-dto'
import { type Controller, type HttpRequest, type HttpResponse, type EmailValidator } from '../../../protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../../errors'
import { badRequest, serverError, forbidden } from '../../../helpers/http-helper'
export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {}
  async handle (httpRequest: HttpRequest<AddAccountRequest>): Promise<HttpResponse<Error> | null> {
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
      if (!account) return forbidden(new Error())
      return null
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
