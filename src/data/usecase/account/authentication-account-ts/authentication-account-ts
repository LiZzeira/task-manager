import { HashCompare } from '../../../protocols/criptography/hash/hash-compare'
import { AccountModel, Authentication } from '../../../../domain'
import { Encrypter } from '../../../protocols/criptography/encrypter/encrypter'
import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly accountRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashCompare,
    private readonly encrypter: Encrypter
  ) {}

  async auth(authenticationParams: any): Promise<AccountModel | null> {
    const data = await this.accountRepository.loadByEmail(
      authenticationParams.email,
      true
    )

    if (data) {
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
        data.password!
      )

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(data.id)
        const { password, ...account } = data
        return {
          ...account,
          token: accessToken
        }
      }
    }
    return null
  }
}
