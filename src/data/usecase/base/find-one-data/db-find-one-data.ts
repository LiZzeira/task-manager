import { FindOneData } from '../../../../domain/usecase/base/find-one-data/find-one-data'
import { FindOneObjectRepository } from '../../../protocols/db/base/find-one-object-repository'

export class DbFindOneData implements FindOneData<any> {
  constructor(private readonly findOneRepository: FindOneObjectRepository) {}
  async findOne(id: string, userId: string): Promise<any> {
    return await this.findOneRepository.findById(id, userId)
  }
}
