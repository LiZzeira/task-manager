import { AccountModel } from '../account/account.model'

export interface TaskModel {
  id: string
  name: string
  description: string
  progress: number
  isCompleted: boolean
  user?: AccountModel
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
