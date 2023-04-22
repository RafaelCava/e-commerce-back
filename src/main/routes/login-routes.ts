import { type Router } from 'express'
import { makeLoginController, makeSignUpController } from '../factories/controllers'
import { adaptRoute } from '../adapters'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
