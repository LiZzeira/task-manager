import { DeleteCounts } from '../../../models/delete-count/delete-count'

export interface DeleteRangeData {
  deleteRange: (
    items: any[] | 'ALL',
    userId?: string,
    relations?: Record<string, any>
  ) => Promise<DeleteCounts>
}
