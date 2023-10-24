import { AccountModel } from '../../../models/account/account.model'

export interface GetAccountByEmail {
  getAccount: (
    email: string,
    showPasswd?: boolean
  ) => Promise<AccountModel | null>
}

export interface GetAccountByToken {
  verifyToken: (token: string) => Promise<AccountModel | undefined>
}
