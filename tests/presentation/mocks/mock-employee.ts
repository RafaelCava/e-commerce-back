import { type AddEmployee, type Authentication } from '../../domain/usecases'
import { mockAuthenticationResult } from '../../domain/mocks'

export const AddEmployeeSpy = (): AddEmployee => {
  class AddEmployeeSpy implements AddEmployee {
    async add (employee: AddEmployee.Params): Promise<AddEmployee.Result> {
      return await Promise.resolve(true)
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
