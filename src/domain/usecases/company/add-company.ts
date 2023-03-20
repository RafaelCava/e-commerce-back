import { type CompanyModel } from '../../models/company'

export interface AddCompany {
  add: (company: AddCompany.Params) => Promise<AddCompany.Result>
}

export namespace AddCompany {
  export type Params = {
    email: string
    name: string
    cnpj?: string
    celPhone?: string
  }

  export type Result = CompanyModel
}
