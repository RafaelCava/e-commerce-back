import { type AddCompany } from '../../../src/domain/usecases/company/add-company'
import { mockCompany } from '../../domain/mocks'

export const AddCompanySpy = (): AddCompany => {
  class AddCompanySpy implements AddCompany {
    async add (company: AddCompany.Params): Promise<AddCompany.Result> {
      return await Promise.resolve(mockCompany())
    }
  }

  return new AddCompanySpy()
}
