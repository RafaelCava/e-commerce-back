import { type EmployeeModel } from 'domain/models/employee'

export interface AddEmployee {
  add: (account: AddEmployee.Params) => Promise<EmployeeModel>
}

export namespace AddEmployee {
  export type Params = {
    name: string
    email: string
    password: string
  }
}
