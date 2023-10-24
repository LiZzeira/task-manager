import { InvalidParamError } from '../../../error'
import { Validation } from '../../../protocols'
import { IdValidator } from '../../../protocols/id-validator'

export class IdValidation implements Validation {
  constructor(
    private readonly id: string,
    private readonly idValidator: IdValidator
  ) {}

  validate(input: any): Error | null {
    const isValid = this.idValidator.isValid(input[this.id])
    if (!isValid) {
      return new InvalidParamError(this.id)
    }
    return null
  }
}
