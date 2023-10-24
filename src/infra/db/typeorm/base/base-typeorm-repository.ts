import { ObjectLiteral, Repository } from 'typeorm'
import { FilterColumns } from '../../../../domain/usecase/base/list-pager/list-pager-data'
import { PagerData } from '../../../../domain/models/list-pager/list-pager-data'
import { typeormHelper } from './helper'
import { mergeObjects } from './mergeObjects'
import { DeleteCounts } from '../../../../domain/models/delete-count/delete-count'
import { AddObjectRepository } from '../../../../data/protocols/db/base/add-object-repository'
import { UpdateObjectRepository } from '../../../../data/protocols/db/base/update-object-repository'
import { FindOneObjectRepository } from '../../../../data/protocols/db/base/find-one-object-repository'
import { ListPagerDataRepository } from '../../../../data/protocols/db/base/list-object-repository'
import { DeleteObjectRepository } from '../../../../data/protocols/db/base/delete-object-repository'

export class BaseTypeormRepository<T extends ObjectLiteral>
  implements
    AddObjectRepository,
    UpdateObjectRepository,
    FindOneObjectRepository,
    ListPagerDataRepository,
    DeleteObjectRepository
{
  connect: Repository<T>

  async add(object: any): Promise<any> {
    const data = await this.connect.save(object)
    return typeormHelper.map(data)
  }

  async update(object: any, userId?: string): Promise<any> {
    const where: any = {
      id: object.id,
      ...(userId ? { user: { id: userId } } : {})
    }
    const data = await this.connect.findOne({
      where
    })

    if (!data) {
      return null
    }

    await this.connect.update(object.id, object)

    const result = await this.connect.findOne({
      where
    })

    return typeormHelper.map(result)
  }

  async findById(id: string, userId?: string, relations?: any): Promise<any> {
    const where: any = { id, ...(userId ? { user: { id: userId } } : {}) }

    const data = await this.connect.findOne({
      where,
      ...(relations && { relations })
    })
    return typeormHelper.map(data)
  }

  async save(data: any): Promise<any> {
    if (data.id) {
      return await this.update(data)
    }
    return await this.add(data)
  }

  async list(
    search?: string,
    page?: number,
    limit?: number | 'all',
    orderBy?: string,
    desc?: boolean,
    filterColumns?: FilterColumns,
    fields?: any[],
    relations?: any,
    select?: any
  ): Promise<PagerData> {
    const hasNoLimit = limit === 'all'
    hasNoLimit ? (limit = 10) : (limit = Number(limit))
    let whereFields: any[] = []
    let where: any[] = []
    let whereFilter: any = {}
    let order: any = {}
    fields = fields ?? []
    select = select ?? ''

    const filterColumnsKeys = Object.keys(filterColumns ?? {})
    fields
      .filter((f) => !filterColumnsKeys.includes(f.field))
      .forEach(({ field, type }) => {
        const object = typeormHelper.formatObject(
          field,
          search,
          undefined,
          type
        )
        if (object && Object.keys(object).length) {
          whereFields.push(object)
        }
      })

    if (filterColumns && Object.keys(filterColumns)) {
      whereFilter =
        typeormHelper.newFormatObject(filterColumns ?? {}, undefined, fields) ??
        {}
    }

    if (whereFields.length) {
      whereFields = whereFields.map((w) => mergeObjects(w, whereFilter))
    } else {
      if (whereFilter && !!Object.keys(whereFilter).length) {
        whereFields = [{ ...whereFilter }]
      }
    }

    where = whereFields

    const length = await this.connect.count({ ...(where.length && { where }) })

    if (!page || page <= 0) {
      page = 0
    }
    if (!limit || Number(limit) < 10) {
      if (limit !== 5) limit = 10
    }
    if (page * Number(limit) >= length) {
      page = Math.floor(length / Number(limit))
    }
    const offset = page * Number(limit)

    order[orderBy ?? 'created_at'] = desc ? 'DESC' : 'ASC'

    order = typeormHelper.createNestedObject(order)

    const data = await this.connect.find({
      ...(where.length && { where }),
      skip: offset,
      order,
      ...(!hasNoLimit && { take: limit }),
      ...(relations && { relations }),
      ...(select && { select })
    })
    const result: any[] = []
    data.forEach((e) => {
      result.push(typeormHelper.map(e))
    })
    return {
      data: result,
      page,
      length,
      limit: !hasNoLimit ? limit : 'no limit'
    } as any
  }

  async delete(id: string, userId?: string): Promise<DeleteCounts> {
    const where: any = { id, ...(userId ? { user: { id: userId } } : {}) }
    const data = await this.connect.softDelete(where)
    return { deleteCount: data.affected ?? 0 }
  }
}
