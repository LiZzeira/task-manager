import { Router } from 'express'
import { adaptRoute } from '../../adpters/express-route-adapter'
import { makeAuthenticationAccountController } from '../../factories/account/login/login-controller-factories'
import { makeAddAccountController } from '../../factories/account/add-account/add-account-factories'
import { makeGetAccountByTokenController } from '../../factories/account/get-account-by-token/get-account-by-token-factories'
import { makeRefreshTokenController } from '../../factories/account/refresh-token/refresh-token-factories'

export default (router: Router): void => {
  // Login
  router.post('/login', adaptRoute(makeAuthenticationAccountController()))

  // Register
  router.post('/register', adaptRoute(makeAddAccountController()))

  // Get User
  router.get('/user', adaptRoute(makeGetAccountByTokenController()))

  // Refresh Token
  router.get('/token', adaptRoute(makeRefreshTokenController()))
}
