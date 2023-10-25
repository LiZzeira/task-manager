import { DbAuthentication } from '../../../../data/usecase/account/authentication-account-ts/db-authentication-account'
import { BcryptAdapter } from '../../../../infra/bcrypt-adapter/bcrypt-adapter'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { LoginController } from '../../../../presentation/controller/account/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import env from '../../../config/env'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeAuthenticationAccountValidation } from './login-controller-validation-factories'

export const makeAuthenticationAccountController = (): Controller => {
  // Repositories
  const accountTypeormRepository = new AccountTypeormRepository()
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const jwtAdapter = new JwtAdapter()

  // Authentication Account Controller
  const dbAuthenticationAccount = new DbAuthentication(
    accountTypeormRepository,
    bcryptAdapter,
    jwtAdapter
  )
  const addAccountController = new LoginController(
    dbAuthenticationAccount,
    makeAuthenticationAccountValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    addAccountController,
    logErrorTypeormRepository
  )
}
