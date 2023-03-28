export interface AddEmployeeRepository {
  add: (employee: AddEmployeeRepository.Params) => Promise<AddEmployeeRepository.Result>
}

export namespace AddEmployeeRepository {
  export type Params = {
    name: string
    email: string
    password: string
    company: string
  }

  export type Result = boolean
}
