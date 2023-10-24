import { AccountModel, GetAccountByEmail } from '../../../../domain'
import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'

export class DbGetAccountByEmail implements GetAccountByEmail {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async getAccount(
    email: string,
    showPasswd = false
  ): Promise<AccountModel | null> {
    return await this.loadAccountByEmailRepository.loadByEmail(
      email,
      showPasswd
    )
  }
}
