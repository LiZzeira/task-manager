import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbDeleteData } from '../../../../data/usecase/base/delete-data/db-delete-data'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { TaskTypeormRepository } from '../../../../infra/db/typeorm/task/task-typeorm-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { DeleteTaskController } from '../../../../presentation/controller/task/delete-task/delete-task-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeDeleteTaskValidation } from './delete-task-validation-factories'

export const makeDeleteTaskController = (): Controller => {
  // Repositories
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const accountTypeormRepository = new AccountTypeormRepository()
  const taskTypeormRepository = new TaskTypeormRepository()

  const dbDeleteTask = new DbDeleteData(taskTypeormRepository)
  const deleteTaskController = new DeleteTaskController(
    dbDeleteTask,
    makeDeleteTaskValidation()
  )

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuth0Decorator = new VerifyUserAuthDecorator(
    deleteTaskController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuth0Decorator,
    logErrorTypeormRepository
  )
}
