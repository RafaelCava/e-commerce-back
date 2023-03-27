import { type HttpResponse } from '../protocols/http'
import { ServerError, EmailInUseError } from '../errors'
import { badRequest, forbidden, serverError, ok } from '../helpers/http-helper'
import { type AddEmployee, type AddCompany, type Authentication } from '../../domain/usecases'
import { type Validation, type Controller } from '../protocols'

export class SignUpController implements Controller<SignUpController.Params> {
  constructor (
    private readonly validation: Validation,
    private readonly addEmployee: AddEmployee,
    private readonly addCompany: AddCompany,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { companyName, email, name, password, celPhone, cnpj } = request
      const company = await this.addCompany.add({ name: companyName, email, cnpj, celPhone })
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
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    companyName: string
    cnpj?: string
    celPhone?: string
  }
}
