import { AppDataSource } from '../../../../../ormconfig'
import { LogErrorRepository } from '../../../../data/protocols/db/log/log-error-repository'
import { BaseTypeormRepository } from '../base/base-typeorm-repository'
import { LogErrorEntity } from '../entities/log-error/log-error-entity'

export class LogErrorTypeormRepository
  extends BaseTypeormRepository<LogErrorEntity>
  implements LogErrorRepository
{
  constructor() {
    super()
    this.connect = AppDataSource.getRepository(LogErrorEntity)
  }

  async logError(stack: string): Promise<void> {
    await this.connect.save({ stack })
  }
}
