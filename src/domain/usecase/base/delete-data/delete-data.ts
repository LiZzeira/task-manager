import { DeleteCounts } from '../../../models/delete-count/delete-count'

export interface DeleteData {
  delete: (
    id: any,
    userId?: string,
    relations?: Record<string, any> | any[]
  ) => Promise<DeleteCounts>
}
