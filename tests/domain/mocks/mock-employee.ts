import { type SignUpController } from '../../presentation/controllers/login/signup/signup'
import { type Authentication } from '../usecases/employee/authentication'
import { type AddEmployee } from '../usecases/employee/add-employee'
import { type EmployeeModel } from '../models/employee'

export const mockEmployee = (): EmployeeModel => ({
  email: 'any_mail@mail.com',
  id: 'any_id',
  name: 'any_name',
  password: 'any_password'
})

export const mockSignUpControllerRequest = (): SignUpController.Request => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password',
  passwordConfirmation: 'any_password',
  companyName: 'any_name'
})

export const mockAddEmployeeParams = (): AddEmployee.Params => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password'
})

export const mockAuthenticationResult = (): Authentication.result => ({
  access_token: 'any_token',
  name: 'any_name'
})
