import { type HttpRequest, type HttpResponse } from './http'

export interface Controller<Q, R> {
  handle: (HttpRequest: Controller.Request<Q>) => Promise<Controller.Response<R>>
}

export namespace Controller {
  export type Request<Q> = HttpRequest<Q>
  export type Response<R> = HttpResponse<R>
}
