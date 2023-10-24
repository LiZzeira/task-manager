export interface Decryptor {
  decrypt: (value: string, secret?: string) => Promise<any | undefined>
}
