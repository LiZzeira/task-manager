export function mergeObjects(obj1, obj2) {
  const result = { ...obj1 }

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        if (typeof result[key] === 'object' && result[key] !== null) {
          result[key] = mergeObjects(result[key], obj2[key])
        } else {
          result[key] = obj2[key]
        }
      } else {
        result[key] = obj2[key]
      }
    }
  }

  return result
}
