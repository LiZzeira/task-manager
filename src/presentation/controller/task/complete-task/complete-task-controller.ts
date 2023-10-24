import { TaskModel } from '../../../../domain/models/task/task.model'
import { UpdateData } from '../../../../domain/usecase/base/update-data/update-data'
import { NotFoundError } from '../../../error'
import {
  badRequest,
  notFound,
  okRequest,
  serverError
} from '../../../helper/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class CompleteTaskController implements Controller {
  constructor(
    private readonly updateTask: UpdateData<Partial<TaskModel>>,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { id } = httpRequest.body
      const { accountUser } = httpRequest.control

      const task = await this.updateTask.update(
        { id, isCompleted: true },
        accountUser.id
      )

      if (!task) {
        return notFound(new NotFoundError('Tarefa'))
      }

      return okRequest(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
