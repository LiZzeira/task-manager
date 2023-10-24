import bcrypt from 'bcrypt'
import { HashCompare } from '../../data/protocols/criptography/hash/hash-compare'
import { Hasher } from '../../data/protocols/criptography/hash/hasher'

export class BcryptAdapter implements Hasher, HashCompare {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed)
  }
}
