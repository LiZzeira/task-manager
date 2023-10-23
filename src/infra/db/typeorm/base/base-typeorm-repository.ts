import { ObjectLiteral, Repository } from 'typeorm'
import { FilterColumns } from '../../../../domain/usecase/base/list-pager/list-pager-data'
import { PagerData } from '../../../../domain/models/list-pager/list-pager-data'
import { typeormHelper } from './helper'
import { mergeObjects } from './mergeObjects'
import { DeleteCounts } from '../../../../domain/models/delete-count/delete-count'

export class BaseTypeormRepository<T extends ObjectLiteral> {
  connect: Repository<T>

  async add(object: any): Promise<any> {
    const data = await this.connect.save(object)
    return typeormHelper.map(data)
  }

  async update(object: any): Promise<any> {
    await this.connect.update(object.id, object)
    const data = await this.connect.findOne({
      where: {
        id: object.id
      }
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

  async deleteRange(
    items: any[] | 'ALL',
    organizationId?: string,
    companyId?: string,
    relations?: Record<string, any>
  ): Promise<DeleteCounts> {
    let where: any = {}

    if (organizationId && organizationId !== '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      where = { organization: { id: organizationId } }
    }

    if (companyId && companyId !== '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      where = { ...where, company: { id: companyId } }
    }

    if (items === 'ALL') {
      items = await this.connect.find({
        ...(where && { where }),
        ...(relations && { relations })
      })
    }

    const allPromises: Promise<any>[] = []

    items.forEach((i: any) => {
      allPromises.push(
        this.connect.findOneOrFail({
          where: { ...where, id: i.id },
          ...(relations && { relations })
        })
      )
    })

    const result = await Promise.all(allPromises)

    const data = await this.connect.softRemove(result)

    return { deleteCount: data.length ?? 0 }
  }
}
