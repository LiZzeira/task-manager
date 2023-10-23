export interface AccountModel {
  id: string
  name: string
  password?: string
  token?: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
