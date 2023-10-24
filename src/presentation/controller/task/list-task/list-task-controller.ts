import { FindOptionsRelations, FindOptionsSelect } from 'typeorm'
import {
  badRequest,
  okRequest,
  serverError
} from '../../../helper/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'
import { TaskEntity } from '../../../../infra/db/typeorm/entities/task/task-entity'
import { ListPagerData } from '../../../../domain/usecase/base/list-pager/list-pager-data'

export class ListTaskController implements Controller {
  constructor(
    private readonly listTask: ListPagerData,
    private readonly validation: Validation
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { search, page, limit, orderBy, desc, filterColumns } =
        httpRequest.body

      const { accountUser } = httpRequest.control

      const filterColumnsValidation = filterColumns ?? {}

      const searchableFields = [
        { field: 'name', type: 'string' },
        { field: 'description', type: 'string' },
        { field: 'isCompleted', type: 'boolean' },
        { field: 'progress', type: 'number' },
        { field: 'user.id', type: 'relation' }
      ]

      filterColumnsValidation['user.id'] = accountUser.id

      const relations: FindOptionsRelations<TaskEntity> | undefined = undefined
      const select: FindOptionsSelect<TaskEntity> | undefined = undefined

      const data = await this.listTask.list(
        search,
        page,
        limit,
        orderBy,
        desc,
        filterColumns,
        searchableFields,
        relations,
        select
      )

      return okRequest(data)
    } catch (error) {
      return serverError(error)
    }
  }
}
