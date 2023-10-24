import { DeleteCounts } from '../../../../domain/models/delete-count/delete-count'
import { DeleteData } from '../../../../domain/usecase/base/delete-data/delete-data'
import { DeleteObjectRepository } from '../../../protocols/db/base/delete-object-repository'

export class DbDeleteData implements DeleteData {
  constructor(
    private readonly deleteObjectRepository: DeleteObjectRepository
  ) {}
  async delete(id: any, userId?: string): Promise<DeleteCounts> {
    return await this.deleteObjectRepository.delete(id, userId)
  }
}
