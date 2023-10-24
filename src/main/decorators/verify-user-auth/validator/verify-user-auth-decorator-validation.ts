import { ValidationComposite } from '../../../../presentation/helper/validator'
import { Validation } from '../../../../presentation/protocols'

export const makeVerifyUserAuthDecoratorValidation =
  (): ValidationComposite => {
    const validation: Validation[] = []
    return new ValidationComposite(validation)
  }
