export interface AddEmployee {
  add: (employee: AddEmployee.Params) => Promise<AddEmployee.Result>
}

export namespace AddEmployee {
  export type Params = {
    name: string
    email: string
    password: string
    company: string
  }

  export type Result = boolean
}
