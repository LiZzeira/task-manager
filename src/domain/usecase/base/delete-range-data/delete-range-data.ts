import { DeleteCounts } from '../../../models/delete-count/delete-count'

export interface DeleteRangeData {
  deleteRange: (
    items: any[] | 'ALL',
    organizationId?: string,
    companyId?: string,
    relations?: Record<string, any>
  ) => Promise<DeleteCounts>
}
