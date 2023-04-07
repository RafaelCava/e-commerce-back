import { type Router } from 'express'
import { makeSignUpController } from '../factories/controllers'
import { adaptRoute } from '../adapters'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
