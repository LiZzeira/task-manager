import { AccountModel } from '../../../models/account/account.model'

export interface AddTaskModel {
  name: string
  description: string
  progress: number
  isCompleted: boolean
  user: AccountModel
}
