import { ValidationComposite } from '../../../../presentation/helper/validator'
import { Validation } from '../../../../presentation/protocols'

export const makeListTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  return new ValidationComposite(validations)
}
