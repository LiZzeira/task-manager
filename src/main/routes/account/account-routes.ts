import { Router } from 'express'
import { adaptRoute } from '../../adpters/express-route-adapter'
import { makeAuthenticationAccountController } from '../../factories/account/login/login-controller-factories'
import { makeAddAccountController } from '../../factories/account/add-account/add-account-factories'

export default (router: Router): void => {
  // Login
  router.post('/login', adaptRoute(makeAuthenticationAccountController()))

  // Register
  router.post('/register', adaptRoute(makeAddAccountController()))
}
