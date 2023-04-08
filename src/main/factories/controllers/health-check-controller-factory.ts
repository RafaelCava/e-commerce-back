import { HealthCheckController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
export const makeHealthCheckController = (): Controller => {
  return new HealthCheckController(makeHealthCheckValidation())
}
