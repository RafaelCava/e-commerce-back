import { type AddEmployee, type Authentication } from '../../../src/domain/usecases'
import { type Employee } from '../../../src/domain/models'
import { Roles } from '../../../src/domain/enums'

export const mockAddEmployeeParams = (): AddEmployee.Params => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password',
  company: 'any_id'
})

export const mockAuthenticationResult = (): Authentication.result => ({
  accessToken: 'any_token',
  name: 'any_name'
})

export const mockEmployee = (): Employee => ({
  id: 'any_id',
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'hashed_value',
  company: 'any_id',
  createdAt: new Date(),
  updatedAt: new Date(),
  logo: 'any_logo',
  role: Roles.EMPLOYEE
})
