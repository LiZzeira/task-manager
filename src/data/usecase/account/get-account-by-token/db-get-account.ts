import { AccountModel, GetAccountByToken } from '../../../../domain'
import { Decryptor } from '../../../protocols/criptography/encrypter/decryptor'
import { GetAccountRepository } from '../../../protocols/db/account/get-account-repository'

export class DbGetAccount implements GetAccountByToken {
  constructor(
    private readonly decrypt: Decryptor,
    private readonly getAccountRepository: GetAccountRepository
  ) {}

  async verifyToken(token: string): Promise<AccountModel | undefined> {
    const id = await this.decrypt.decrypt(token)
    if (!id) {
      return undefined
    }
    return await this.getAccountRepository.getAccount(id, true)
  }
}
