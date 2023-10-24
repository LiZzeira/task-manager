import { Authentication } from '../../../../domain/usecase/account/authentication/authentication'
import {
  badRequest,
  okRequest,
  serverError,
  unauthorized
} from '../../../helper/http/http-helper'
import { Validation } from '../../../protocols'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({
        email: email.toLowerCase(),
        password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return okRequest(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
