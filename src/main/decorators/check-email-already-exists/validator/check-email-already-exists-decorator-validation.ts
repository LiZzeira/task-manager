import { ValidationComposite } from '../../../../presentation/helper/validator'
import { Validation } from '../../../../presentation/protocols'

export const makeCheckEmailAlreadyExistsDecoratorValidation =
  (): ValidationComposite => {
    const validation: Validation[] = []
    return new ValidationComposite(validation)
  }
