import { AccountModel } from '../../../../domain'

export interface LoadAccountByEmailRepository {
  loadByEmail: (
    email: string,
    showPasswd?: boolean
  ) => Promise<AccountModel | null>
}
