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

export const AuthenticationStub = (): Authentication => {
  class AuthenticationSpy implements Authentication {
    async auth (params: Authentication.Params): Promise<Authentication.result> {
      return await Promise.resolve(mockAuthenticationResult())
    }
  }
  return new AuthenticationSpy()
}

export class AuthenticationSpy implements Authentication {
  params?: Authentication.Params
  counter = 0
  throwError = false
  returnNull = false
  async auth (params: Authentication.Params): Promise<Authentication.result> {
    this.counter++
    this.params = params
    if (this.throwError) throw new Error()
    if (this.returnNull) return null
    return await Promise.resolve(mockAuthenticationResult())
  }
}
