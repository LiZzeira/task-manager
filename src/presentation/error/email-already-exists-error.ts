export class EmailAlreadyExistsError extends Error {
  constructor(paraName: string) {
    super(`E-mail já registrado: ${paraName}`)
    this.name = 'EmailAlreadyExistsError'
  }
}
