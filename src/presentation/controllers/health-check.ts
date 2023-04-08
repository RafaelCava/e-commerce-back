import { ok } from '../helpers/http-helper'
import { type HttpResponse, type Controller } from '../protocols'

export class HealthCheckController implements Controller {
  async handle (): Promise<HealthCheckController.Result> {
    return await Promise.resolve(ok({ message: 'Server is running' }))
  }
}

export namespace HealthCheckController {
  export type Result = HttpResponse
}
