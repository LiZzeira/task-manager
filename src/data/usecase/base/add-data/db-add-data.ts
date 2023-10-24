import { AddData } from '../../../../domain/usecase/base/add-data/add-data'
import { AddObjectRepository } from '../../../protocols/db/base/add-object-repository'

export class DbAddData implements AddData<any, any> {
  constructor(private readonly addObjectRepository: AddObjectRepository) {}
  async add(object: any): Promise<any> {
    return await this.addObjectRepository.add(object)
  }
}
