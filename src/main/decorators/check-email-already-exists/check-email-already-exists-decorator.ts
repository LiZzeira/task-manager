import { GetAccountByEmail } from '../../../domain'
import { EmailAlreadyExistsError } from '../../../presentation/error'
import {
  badRequest,
  serverError
} from '../../../presentation/helper/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../presentation/protocols'

export class CheckEmailAlreadyExistsDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly getter: GetAccountByEmail,
    private readonly validation: Validation,
    private readonly field: string
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error && error !== null) {
        return badRequest(error)
      }
      const email = httpRequest.body[this.field]

      const account = await this.getter.getAccount(email)
      if (account) {
        return badRequest(new EmailAlreadyExistsError(this.field))
      }
      return await this.controller.handle(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }
}
