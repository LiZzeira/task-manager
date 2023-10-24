import { MissingParamError } from '../../../error'
import { Validation } from '../../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | null {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
