import { type AddCompany } from '../../domain/usecases'

export const AddCompanySpy = (): AddCompany => {
  class AddCompanySpy implements AddCompany {
    async add (company: AddCompany.Params): Promise<AddCompany.Result> {
      return await Promise.resolve({
        id: 'any_id'
      })
    }
  }

  return new AddCompanySpy()
}
