import { type HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: error
})

export const ok = (body: any): HttpResponse<any> => ({
  statusCode: 200,
  body
})

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  body: error
})
