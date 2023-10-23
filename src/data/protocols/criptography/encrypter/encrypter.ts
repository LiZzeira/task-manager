export interface Encrypter {
  encrypt: (
    value: string,
    expires?: number | string,
    secret?: string
  ) => Promise<string>
}
