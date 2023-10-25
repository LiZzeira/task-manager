import { ValidationComposite } from '../../../../presentation/helper/validator'
import { Validation } from '../../../../presentation/protocols'

export const makeRefreshTokenValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  return new ValidationComposite(validations)
}
