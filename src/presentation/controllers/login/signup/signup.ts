import {
  type Controller,
  type EmailValidator,
  type AddEmployee,
  type Authentication,
  type AddCompany
} from './signup-protocols'
import { MissingParamError, InvalidParamError, ServerError, EmailInUseError } from '../../../errors'
import { badRequest, forbidden, serverError, ok } from '../../../helpers/http-helper'
export class SignUpController implements Controller<SignUpController.Request, SignUpController.Response> {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addEmployee: AddEmployee,
    private readonly addCompany: AddCompany,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: Controller.Request<SignUpController.Request>): Promise<Controller.Response<SignUpController.Response>> {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation', 'companyName']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password, passwordConfirmation, name, companyName } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      const employee = await this.addEmployee.add({ email, password, name })
      if (!employee) return forbidden(new EmailInUseError())
      await this.addCompany.add({ name: companyName, email })
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
