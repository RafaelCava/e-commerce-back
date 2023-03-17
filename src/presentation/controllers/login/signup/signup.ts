import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { MissingParamError } from '../../../errors/missing-param-error'
import { badRequest } from '../../../helpers/http-helper'
export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return await Promise.resolve(null)
  }
}
