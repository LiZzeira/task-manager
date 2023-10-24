import jwt from 'jsonwebtoken'
import env from '../../main/config/env'
import { Decryptor } from '../../data/protocols/criptography/encrypter/decryptor'
import { Encrypter } from '../../data/protocols/criptography/encrypter/encrypter'

export class JwtAdapter implements Encrypter, Decryptor {
  defaultSecret = env.jwtSecret
  defaultExpiresIn = '2 days'

  async encrypt(
    value: any,
    expiresIn?: string | number,
    secret?: string
  ): Promise<string> {
    const accessToken = jwt.sign({ id: value }, secret ?? this.defaultSecret, {
      expiresIn: expiresIn ?? this.defaultExpiresIn
    })
    return accessToken
  }

  async decrypt(value: string, secret?: string): Promise<any | undefined> {
    let id: string | null = null
    try {
      const decoded: any = jwt.verify(value, secret ?? this.defaultSecret)
      id = decoded.id
      return id
    } catch (err) {
      return undefined
    }
  }
}
