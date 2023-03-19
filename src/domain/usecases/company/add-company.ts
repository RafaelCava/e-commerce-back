import { type CompanyModel } from '../../models/company'

export interface AddCompany {
  add: (company: AddCompany.Params) => Promise<AddCompany.Result>
}

export namespace AddCompany {
  export type Params = {
    email: string
    name: string
    cnpj?: string
    cel_phone?: string
  }

  export type Result = CompanyModel
}
