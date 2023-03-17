import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { MissingParamError } from '../../../errors/missing-param-error'
import { badRequest } from '../../../helpers/http-helper'
export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return await Promise.resolve(null)
  }
}
