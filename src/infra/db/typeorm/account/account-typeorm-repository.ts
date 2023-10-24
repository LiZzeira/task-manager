import { AppDataSource } from '../../../../../ormconfig'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../../../domain'
import { BaseTypeormRepository } from '../base/base-typeorm-repository'
import { typeormHelper } from '../base/helper'
import { AccountEntity } from '../entities/account/account-entity'

export class AccountTypeormRepository
  extends BaseTypeormRepository<AccountEntity>
  implements LoadAccountByEmailRepository
{
  constructor() {
    super()
    this.connect = AppDataSource.getRepository(AccountEntity)
  }

  async loadByEmail(
    email: string,
    showPasswd?: boolean | undefined
  ): Promise<AccountModel | null> {
    const account = await this.connect.findOne({
      where: {
        email
      }
    })
    if (showPasswd) {
      return typeormHelper.map(account)
    }
    return typeormHelper.mapAccount(account)
  }

  async getAccount(
    id: string,
    address: boolean = false
  ): Promise<AccountModel> {
    const data = await this.connect.findOne({
      where: { id }
    })
    return typeormHelper.mapAccount(data)
  }
}
