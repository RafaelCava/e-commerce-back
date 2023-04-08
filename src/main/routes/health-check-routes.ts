import { type Router } from 'express'
import { makeHealthCheckController } from '../factories/controllers'
import { adaptRoute } from '../adapters'

export default (router: Router): void => {
  router.get('/health', adaptRoute(makeHealthCheckController()))
}
