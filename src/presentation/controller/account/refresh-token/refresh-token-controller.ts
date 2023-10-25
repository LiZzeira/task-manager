import { RefreshToken } from '../../../../domain/usecase/account/refresh-token/refresh-token'
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

export class RefreshTokenController implements Controller {
  constructor(
    private readonly refreshToken: RefreshToken,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { accountUser } = httpRequest.control

      const token = await this.refreshToken.refresh(accountUser)

      return okRequest({ token })
    } catch (error) {
      return serverError(error)
    }
  }
}
