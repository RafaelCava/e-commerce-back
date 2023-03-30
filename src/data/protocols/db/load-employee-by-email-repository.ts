import { type Employee } from '../../../domain/models/employee'
export interface LoadEmployeeByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadEmployeeByEmailRepository.Result>
}

export namespace LoadEmployeeByEmailRepository {
  export type Result = Employee
}
