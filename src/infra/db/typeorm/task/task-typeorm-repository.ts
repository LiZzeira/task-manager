import { AppDataSource } from '../../../../../ormconfig'
import { BaseTypeormRepository } from '../base/base-typeorm-repository'
import { TaskEntity } from '../entities/task/task-entity'

export class TaskTypeormRepository extends BaseTypeormRepository<TaskEntity> {
  constructor() {
    super()
    this.connect = AppDataSource.getRepository(TaskEntity)
  }
}
