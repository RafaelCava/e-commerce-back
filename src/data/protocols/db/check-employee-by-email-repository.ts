export interface CheckEmployeeByEmailRepository {
  checkByEmail: (email: string) => Promise<CheckEmployeeByEmailRepository.Result>
}

export namespace CheckEmployeeByEmailRepository {
  export type Result = boolean
}
