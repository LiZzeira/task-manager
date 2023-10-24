import { TaskModel } from '../../../../domain/models/task/task.model'
import { AddData } from '../../../../domain/usecase/base/add-data/add-data'
import { AddTaskModel } from '../../../../domain/usecase/task/add-task/add-task'
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

export class AddTaskController implements Controller {
  constructor(
    private readonly addTask: AddData<AddTaskModel, TaskModel>,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, description, progress, isCompleted } = httpRequest.body
      const { accountUser } = httpRequest.control

      const task = await this.addTask.add({
        name,
        description,
        progress,
        isCompleted,
        user: accountUser
      })

      delete task.user

      return okRequest(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
