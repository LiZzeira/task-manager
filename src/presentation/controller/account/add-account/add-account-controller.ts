import { Authentication } from '../../../../domain'
import { AddAccount } from '../../../../domain/usecase/account/add-account/add-account'
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

export class AddAccountController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/

      if (!password.match(regex)) {
        return badRequest(
          new Error(
            'A senha deve conter pelo menos 6 dígitos, uma letra e um número'
          )
        )
      }

      await this.addAccount.add({
        name,
        email,
        password
      })

      const accessToken = await this.authentication.auth({
        email: email.toLowerCase(),
        password
      })

      return okRequest(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
