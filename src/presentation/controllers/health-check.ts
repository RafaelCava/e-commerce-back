import { ok, serverError } from '../helpers/http-helper'
import { type HttpResponse, type Controller, type Validation } from '../protocols'

export class HealthCheckController implements Controller {
  constructor (private readonly validation: Validation) {}
  async handle (request: any): Promise<HealthCheckController.Result> {
    const error = this.validation.validate(request)
    if (error) {
      return serverError(error)
    }
    return await Promise.resolve(ok({ message: 'Server is running' }))
  }
}

export namespace HealthCheckController {
  export type Result = HttpResponse
}
