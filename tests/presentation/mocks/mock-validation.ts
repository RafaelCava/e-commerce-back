import { type Validation } from '../../../src/presentation/protocols/validation'

export const ValidationSpy = (): Validation => {
  class ValidationSpy implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationSpy()
}
