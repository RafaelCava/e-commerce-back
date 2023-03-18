export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.result>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }
  export type result = {
    access_token: string
    name: string
  }
}
