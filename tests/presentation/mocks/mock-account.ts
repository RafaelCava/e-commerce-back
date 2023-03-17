import { mockAccount } from '../../domain/mocks/mock-account'
import { type AddAccount } from '../../../src/domain/usecases/account/add-account'

export const AddAccountSpy = (): AddAccount => {
  class AddAccountSpy implements AddAccount {
    async add (account: AddAccount.Params): Promise<AddAccount.Result> {
      return await Promise.resolve(mockAccount())
    }
  }

  return new AddAccountSpy()
}
