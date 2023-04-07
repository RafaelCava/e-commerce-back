export interface AddCompanyRepository {
  add: (employee: AddCompanyRepository.Params) => Promise<AddCompanyRepository.Result>
}

export namespace AddCompanyRepository {
  export type Params = {
    email: string
    name: string
    cnpj?: string
    celPhone?: string
  }

  export type Result = {
    id: string
  }
}
