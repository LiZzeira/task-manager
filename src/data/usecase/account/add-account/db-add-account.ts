import { AccountModel } from '../../../../domain'
import {
  AddAccount,
  AddAccountModel
} from '../../../../domain/usecase/account/add-account/add-account'
import { Hasher } from '../../../protocols/criptography/hash/hasher'
import { AddObjectRepository } from '../../../protocols/db/base/add-object-repository'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddObjectRepository
  ) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(account.password)
    const data = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return data
  }
}
