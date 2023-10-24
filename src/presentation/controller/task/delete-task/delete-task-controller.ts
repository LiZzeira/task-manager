import { DeleteData } from '../../../../domain/usecase/base/delete-data/delete-data'
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

export class DeleteTaskController implements Controller {
  constructor(
    private readonly deleteData: DeleteData,
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
      const res = await this.deleteData.delete(id, accountUser.id)

      return okRequest(res)
    } catch (error) {
      return serverError(error)
    }
  }
}
