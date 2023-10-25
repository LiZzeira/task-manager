import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbRefreshToken } from '../../../../data/usecase/account/refresh-token/db-refresh-token'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { RefreshTokenController } from '../../../../presentation/controller/account/refresh-token/refresh-token-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeRefreshTokenValidation } from './refresh-token-validaiton-factories'

export const makeRefreshTokenController = (): Controller => {
  // Repositories
  const accountTypeormRepository = new AccountTypeormRepository()
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const jwtAdapter = new JwtAdapter()

  // Authentication Account Controller
  const dbRefreshToken = new DbRefreshToken(jwtAdapter)
  const refreshTokenController = new RefreshTokenController(
    dbRefreshToken,
    makeRefreshTokenValidation()
  )

  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuthDecorator = new VerifyUserAuthDecorator(
    refreshTokenController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuthDecorator,
    logErrorTypeormRepository
  )
}
