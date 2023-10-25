import { RefreshToken } from '../../../../domain/usecase/account/refresh-token/refresh-token'
import { Encrypter } from '../../../protocols/criptography/encrypter/encrypter'

export class DbRefreshToken implements RefreshToken {
  constructor(private readonly encrypter: Encrypter) {}

  async refresh(id: string): Promise<string> {
    return await this.encrypter.encrypt(id)
  }
}
