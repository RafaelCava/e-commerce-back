import { type Validation } from '../../../src/presentation/protocols/validation'

export const ValidationSpy = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
