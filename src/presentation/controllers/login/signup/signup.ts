import {
  type Controller,
  type AddEmployee,
  type Authentication,
  type AddCompany,
  type Validation
} from './signup-protocols'
import { ServerError, EmailInUseError } from '../../../errors'
import { badRequest, forbidden, serverError, ok } from '../../../helpers/http-helper'
export class SignUpController implements Controller<SignUpController.Request, SignUpController.Response> {
  constructor (
    private readonly validation: Validation,
    private readonly addEmployee: AddEmployee,
    private readonly addCompany: AddCompany,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: Controller.Request<SignUpController.Request>): Promise<Controller.Response<SignUpController.Response>> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyName, email, name, password, cel_phone, cnpj } = httpRequest.body
      const company = await this.addCompany.add({ name: companyName, email, cnpj, cel_phone })
      if (!company) return forbidden(new EmailInUseError())
      const employee = await this.addEmployee.add({ email, password, name, company: company.id })
      if (!employee) return forbidden(new EmailInUseError())
      const authenticationResult = await this.authentication.auth({
        email,
        password
      })
      return ok(authenticationResult)
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    companyName: string
    cnpj?: string
    cel_phone?: string
  }

  export type Response = Authentication.result | Error
}
