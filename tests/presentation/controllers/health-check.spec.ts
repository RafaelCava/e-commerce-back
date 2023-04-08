import { ok } from '@/presentation/helpers/http-helper'
import { HealthCheckController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import { type Validation } from '@/presentation/protocols'

type SutTypes = {
  sut: HealthCheckController
  validationSpy: Validation
}

const makeSut = (): SutTypes => {
  const validationSpy = ValidationSpy()
  const sut = new HealthCheckController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('HealthCheckController', () => {
  it('should return 200 when health check is succeed', async () => {
    const { sut } = makeSut()
    const health = await sut.handle({})
    expect(health).toEqual(ok({ message: 'Server is running' }))
  })

  it('Should call Validation once time', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    await sut.handle({})
    expect(validateSpy).toHaveBeenCalledWith({})
  })
})
