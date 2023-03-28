export interface CheckCompanyByEmailRepository {
  checkByEmail: (email: string) => Promise<CheckCompanyByEmailRepository.Result>
}

export namespace CheckCompanyByEmailRepository {
  export type Result = boolean
}
