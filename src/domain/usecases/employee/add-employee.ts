import { type EmployeeModel } from 'domain/models/employee'

export interface AddEmployee {
  add: (account: AddEmployee.Params) => Promise<AddEmployee.Result>
}

export namespace AddEmployee {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = EmployeeModel
}
