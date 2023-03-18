import { type AddAccount } from '../../../src/domain/usecases/account/add-account'
import { type Authentication } from './../../../src/domain/usecases/account/authentication'
import { mockAccount, mockAuthenticationResult } from '../../domain/mocks/mock-account'
import { type AccountModel } from '../../domain/models/account'

export const AddAccountSpy = (): AddAccount => {
  class AddAccountSpy implements AddAccount {
    async add (account: AddAccount.Params): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }

  return new AddAccountSpy()
}

export const AuthenticationSpy = (): Authentication => {
  class AuthenticationSpy implements Authentication {
    async auth (params: Authentication.Params): Promise<Authentication.result> {
      return await Promise.resolve(mockAuthenticationResult())
    }
  }
  return new AuthenticationSpy()
}
