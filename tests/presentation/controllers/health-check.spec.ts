import { ok } from '@/presentation/helpers/http-helper'
import { HealthCheckController } from '@/presentation/controllers'

type SutTypes = {
  sut: HealthCheckController
}

const makeSut = (): SutTypes => {
  const sut = new HealthCheckController()
  return {
    sut
  }
}

describe('HealthCheckController', () => {
  it('should return 200 when health check is succeed', async () => {
    const { sut } = makeSut()
    const health = await sut.handle()
    expect(health).toEqual(ok({ message: 'Server is running' }))
  })
})
