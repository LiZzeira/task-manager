import { UpdateData } from '../../../../domain/usecase/base/update-data/update-data'
import { UpdateObjectRepository } from '../../../protocols/db/base/update-object-repository'

export class DbUpdateData implements UpdateData<any> {
  constructor(
    private readonly updateObjectRepository: UpdateObjectRepository
  ) {}
  async update(object: any): Promise<any> {
    return await this.updateObjectRepository.update(object)
  }
}
