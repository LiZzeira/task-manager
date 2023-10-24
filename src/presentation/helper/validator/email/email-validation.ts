import { InvalidParamError } from '../../../error'
import { EmailValidator } from '../../../protocols/email-validator'
import { Validation } from '../../../protocols/validation'

export class EmailValidation implements Validation {
  constructor(
    private readonly email: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.email])
    if (!isValid) {
      return new InvalidParamError(this.email)
    }
    return null
  }
}
