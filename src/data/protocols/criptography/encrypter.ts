export interface Encrypter {
  encrypt: (value: string | object) => Promise<string>
}
