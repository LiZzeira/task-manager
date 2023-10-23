import { DeleteCounts } from '../../../models/delete-count/delete-count'

export interface DeleteData {
  delete: (
    id: any,
    organizationId?: string,
    companyId?: string,
    relations?: Record<string, any> | any[]
  ) => Promise<DeleteCounts>
}
