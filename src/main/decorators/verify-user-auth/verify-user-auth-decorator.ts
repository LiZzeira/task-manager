import { GetAccountByToken } from '../../../domain'
import {
  badRequest,
  okRequest,
  serverError,
  unauthorized
} from '../../../presentation/helper/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../presentation/protocols'

export class VerifyUserAuthDecorator implements Controller {
  constructor(
    private readonly controller: Controller | undefined,
    private readonly validateToken: GetAccountByToken,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error && error !== null) {
        return badRequest(error)
      }
      const { accessToken } = httpRequest.body

      if (!accessToken) {
        return unauthorized()
      }

      const user = await this.validateToken.verifyToken(accessToken)

      if (!user || !Object.keys(user).length) {
        return unauthorized('O token expirou')
      }
      if (!this.controller) {
        delete user.password
        return okRequest(user)
      }

      return await this.controller.handle({
        body: { ...httpRequest.body },
        control: { ...httpRequest.control, accountUser: user }
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
