import { type Controller, type HttpRequest, type HttpResponse } from '../../../protocols'
export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
    return await Promise.resolve(null)
  }
}
