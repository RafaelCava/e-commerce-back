import { type AddEmployee } from '../../domain/usecases/employee/add-employee'
import { type Authentication } from '../../domain/usecases/employee/authentication'
import { mockEmployee, mockAuthenticationResult } from '../../domain/mocks/mock-employee'
import { type EmployeeModel } from '../../domain/models/employee'

export const AddEmployeeSpy = (): AddEmployee => {
  class AddEmployeeSpy implements AddEmployee {
    async add (employee: AddEmployee.Params): Promise<EmployeeModel> {
      return await Promise.resolve(mockEmployee())
    }
  }

  return new AddEmployeeSpy()
}

export const AuthenticationSpy = (): Authentication => {
  class AuthenticationSpy implements Authentication {
    async auth (params: Authentication.Params): Promise<Authentication.result> {
      return await Promise.resolve(mockAuthenticationResult())
    }
  }
  return new AuthenticationSpy()
}
