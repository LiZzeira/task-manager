import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbUpdateData } from '../../../../data/usecase/base/update-data/db-update-data'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { TaskTypeormRepository } from '../../../../infra/db/typeorm/task/task-typeorm-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { UpdateTaskController } from '../../../../presentation/controller/task/update-task/update-task-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeUpdateTaskValidation } from './update-task-validation-factories'

export const makeUpdateTaskController = (): Controller => {
  // Repositories
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const accountTypeormRepository = new AccountTypeormRepository()
  const taskTypeormRepository = new TaskTypeormRepository()

  const dbUpdateTask = new DbUpdateData(taskTypeormRepository)
  const updateTaskController = new UpdateTaskController(
    dbUpdateTask,
    makeUpdateTaskValidation()
  )

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuth0Decorator = new VerifyUserAuthDecorator(
    updateTaskController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuth0Decorator,
    logErrorTypeormRepository
  )
}
