import { AccountModel } from '../../../models/account/account.model'

export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<AccountModel | null>
}
