import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'

export const makeGetAccountByTokenController = (): Controller => {
  // Repositories
  const accountTypeormRepository = new AccountTypeormRepository()
  const logErrorTypeormRepository = new LogErrorTypeormRepository()

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)

  const verifyUserAuthDecorator = new VerifyUserAuthDecorator(
    undefined,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuthDecorator,
    logErrorTypeormRepository
  )
}
