import { AccountModel } from '../../../../domain'

export interface GetAccountRepository {
  getAccount: (
    id: string,
    address?: boolean,
    organization?: boolean
  ) => Promise<AccountModel | undefined>
}
