import { ValidationComposite } from '../../../../presentation/helper/validator'
import { IdValidation } from '../../../../presentation/helper/validator/is-uuid/uuid-validation'
import { RequiredFieldValidation } from '../../../../presentation/helper/validator/riquired-field/riquered-field-validation'
import { Validation } from '../../../../presentation/protocols'
import { IdValidatorAdapter } from '../../../../utils/id-validator/id-validator-adapter'

const requiredFields = ['id']

export const makeFindOneTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new IdValidation('id', new IdValidatorAdapter()))

  return new ValidationComposite(validations)
}
