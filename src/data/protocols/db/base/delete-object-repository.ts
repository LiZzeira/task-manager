import { DeleteCounts } from '../../../../domain/models/delete-count/delete-count'

export interface DeleteObjectRepository {
  delete: (
    id: string,
    userId?: string,
    relations?: Record<string, any>
  ) => Promise<DeleteCounts>
}
