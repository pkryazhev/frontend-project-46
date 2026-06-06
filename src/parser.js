import _ from 'lodash'
import { isObject } from './utils.js'

const compareNode = (key, object1, object2) => {
  const value1 = object1[key]
  const value2 = object2[key]
  if (!Object.hasOwn(object1, key)) {
    return {
      key,
      type: 'added',
      value: value2,
    }
  }
  if (!Object.hasOwn(object2, key)) {
    return {
      key,
      type: 'removed',
      value: value1,
    }
  }
  if (isObject(value1) && isObject(value2)) {
    return {
      key,
      type: 'nested',
      children: compare(value1, value2),
    }
  }
  else {
    if (value1 === value2) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      }
    }
    else {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2,
      }
    }
  }
}

export const compare = function (object1, object2) {
  const keys = _.union(Object.keys(object1), Object.keys(object2)).sort()
  const result = keys.map((key) => {
    return compareNode(key, object1, object2)
  })
  return result
}
