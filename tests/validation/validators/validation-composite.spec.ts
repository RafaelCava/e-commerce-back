import { MissingParamError } from '../../../src/presentation/errors'
import { type Validation } from '../../../src/presentation/protocols'
import { ValidationComposite } from '../../../src/validation/validators'
import { ValidationSpy } from '../mocks'

type SutTypes = {
  sut: ValidationComposite
  validationsSpy: Validation[]
}

const makeSut = (): SutTypes => {
  const validationsSpy = [ValidationSpy(), ValidationSpy()]
  const sut = new ValidationComposite(validationsSpy)
  return {
    sut,
    validationsSpy
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationsSpy } = makeSut()
    jest.spyOn(validationsSpy[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationsSpy } = makeSut()
    jest.spyOn(validationsSpy[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationsSpy[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
