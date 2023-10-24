import { DbAddAccount } from '../../../../data/usecase/account/add-account/db-add-account'
import { DbAuthentication } from '../../../../data/usecase/account/authentication-account-ts/db-authentication-account'
import { DbGetAccountByEmail } from '../../../../data/usecase/account/get-account-by-email/db-get-account-by-email'
import { BcryptAdapter } from '../../../../infra/bcrypt-adapter/bcrypt-adapter'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { AddAccountController } from '../../../../presentation/controller/account/add-account/add-account-controller'
import { Controller } from '../../../../presentation/protocols'
import env from '../../../config/env'
import { CheckEmailAlreadyExistsDecorator } from '../../../decorators/check-email-already-exists/check-email-already-exists-decorator'
import { makeCheckEmailAlreadyExistsDecoratorValidation } from '../../../decorators/check-email-already-exists/validator/check-email-already-exists-decorator-validation'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeAddAccountValidation } from './add-account-validation-factories'

export const makeAddAccountController = (): Controller => {
  // Repositories
  const accountTypeormRepository = new AccountTypeormRepository()
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const brcryptAdapter = new BcryptAdapter(env.salt)
  const jwtAdapter = new JwtAdapter()

  // Authentication Account Controller
  const dbAuthenticationAccount = new DbAuthentication(
    accountTypeormRepository,
    brcryptAdapter,
    jwtAdapter
  )

  // Add Account Controller
  const dbAddAccount = new DbAddAccount(
    brcryptAdapter,
    accountTypeormRepository
  )

  const addAccountController = new AddAccountController(
    dbAddAccount,
    dbAuthenticationAccount,
    makeAddAccountValidation()
  )

  // Check if email already exists Decorator
  const dbGetAccountByEmail = new DbGetAccountByEmail(accountTypeormRepository)
  const checkEmailAlreadyExistsDecorator = new CheckEmailAlreadyExistsDecorator(
    addAccountController,
    dbGetAccountByEmail,
    makeCheckEmailAlreadyExistsDecoratorValidation(),
    'email'
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    checkEmailAlreadyExistsDecorator,
    logErrorTypeormRepository
  )
}
