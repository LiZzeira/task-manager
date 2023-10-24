import { IdValidator } from '../../presentation/protocols/id-validator'
import validator from 'validator'

export class IdValidatorAdapter implements IdValidator {
  isValid(id: string): boolean {
    return validator.isUUID(id ?? '')
  }
}
