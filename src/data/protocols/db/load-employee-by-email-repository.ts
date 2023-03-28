export interface LoadEmployeeByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadEmployeeByEmailRepository.Result>
}

export namespace LoadEmployeeByEmailRepository {
  export type Result = {
    id: string
    password: string
  }
}
