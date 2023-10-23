import { Between, Equal, ILike, In, IsNull, LessThan, MoreThan } from 'typeorm'
import validator from 'validator'
import { createDate } from '../../../../utils/create-date/create-date'

class BaseTypeormHelpers {
  map(data: any): any {
    if (!data) {
      return data
    }
    const { id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: `${id}` })
  }

  mapAccount(collection: any): any {
    if (!collection) {
      return collection
    }
    delete collection.password
    delete collection.token
    if (!collection.isRoot) {
      delete collection.isRoot
    }
    const { id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: `${id}` })
  }

  createNestedObject(inputObj) {
    const outputObj = {}

    for (const key in inputObj) {
      const parts = key.split('.')
      let currentObj = outputObj

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        if (!currentObj[part]) {
          if (i === parts.length - 1) {
            currentObj[part] = inputObj[key]
          } else {
            currentObj[part] = {}
          }
        }
        currentObj = currentObj[part]
      }
    }

    return outputObj
  }

  formatObject(key, value, id, type): any {
    if ((value === undefined || value === null) && type !== 'null') {
      return
    }
    const formattedObject = {}

    if (id?.id) {
      formattedObject[id.relations || 'id'] = id.relations
        ? { id: id.id }
        : id.id
    }

    if (id?.id && id?.isIn) {
      const ids: string[] = []
      ids.push(id?.id)

      formattedObject[id.relations || 'id'] = id.relations
        ? { id: In(ids) }
        : In(ids)
    }

    if (type === 'date') {
      if (Array.isArray(value)) {
        const initialDate = createDate(value[0])
        const isValidInitial = !isNaN(initialDate.getTime())
        const finalDate = createDate(value[1])
        const isValidFinal = !isNaN(finalDate.getTime())
        formattedObject[key] = Between(
          isValidInitial ? initialDate : createDate(0),
          isValidFinal ? finalDate : createDate()
        )
        return this.createNestedObject(formattedObject)
      } else {
        formattedObject[key] = Between(createDate(0), createDate())
        return this.createNestedObject(formattedObject)
      }
    }

    if (type === 'null') {
      formattedObject[key] = IsNull()
      return this.createNestedObject(formattedObject)
    }

    if (Array.isArray(value) && type !== 'manyRelation') {
      formattedObject[key] = Between(value[0], value[1])
      return this.createNestedObject(formattedObject)
    }

    const parsedSearch = parseInt(value ?? '', 10)
    if (type === 'number' && ((!value && value !== 0) || isNaN(parsedSearch))) {
      return null
    }

    if (!isNaN(parsedSearch) && type === 'number') {
      formattedObject[key] = Equal(parsedSearch)
      return this.createNestedObject(formattedObject)
    }

    if (type === 'string') {
      formattedObject[key] = ILike(`%${value ?? ''}%`)
      return this.createNestedObject(formattedObject)
    }

    if (type === 'relation' && validator.isUUID(value ?? '')) {
      formattedObject[key] = value
      return this.createNestedObject(formattedObject)
    }

    if (
      type === 'manyRelation' &&
      Array.isArray(value) &&
      value.filter((id) => !validator.isUUID(id))
    ) {
      formattedObject[key] = In(value)
      return this.createNestedObject(formattedObject)
    }
    if (type === 'boolean') {
      if (value === false || value === true) {
        formattedObject[key] = value
        return this.createNestedObject(formattedObject)
      }
    }
  }

  newFormatObject(filterColumns: any, id: any, type: any[]): any {
    return this.transformObject(filterColumns, id, type)
  }

  transformObject(
    input: Record<string, string>,
    id: any,
    type: any[]
  ): Record<string, any> {
    const output: Record<string, any> = {}

    for (const key in input) {
      const hasType = type.filter((t) => t.field === key)[0].type
      if (hasType) {
        const parts = key.split('.')
        let current = output
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i]
          if (!current[part]) {
            if (i === parts.length - 1) {
              current[part] = this.formatObject(part, input[key], id, hasType)[
                part
              ]
            } else {
              current[part] = {}
            }
          }
          current = current[part]
        }
      }
    }

    return output
  }
}

export const typeormHelper = new BaseTypeormHelpers()
