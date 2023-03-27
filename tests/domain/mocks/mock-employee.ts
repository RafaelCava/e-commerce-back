import { type AddEmployee, type Authentication } from '../usecases'

export const mockAddEmployeeParams = (): AddEmployee.Params => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password',
  company: 'any_id'
})

export const mockAuthenticationResult = (): Authentication.result => ({
  access_token: 'any_token',
  name: 'any_name'
})
