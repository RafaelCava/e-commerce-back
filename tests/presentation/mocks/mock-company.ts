import { type AddCompany } from '../../../src/domain/usecases/company/add-company'
import { type CompanyModel } from '../../../src/domain/models/company'
import { mockCompany } from '../../domain/mocks'

export const AddCompanySpy = (): AddCompany => {
  class AddCompanySpy implements AddCompany {
    async add (company: AddCompany.Params): Promise<CompanyModel> {
      return await Promise.resolve(mockCompany())
    }
  }

  return new AddCompanySpy()
}
