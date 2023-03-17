import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
import { MissingParamError } from '../../../errors/missing-param-error'
export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    return await Promise.resolve(null)
  }
}
