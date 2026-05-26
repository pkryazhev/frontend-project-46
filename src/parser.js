import _ from 'lodash'

export const parseFile = function (fileData) {
  return JSON.parse(fileData)
}

export const compare = function (object1, object2) {
  const result = []
  const keys = _.union(Object.keys(object1), Object.keys(object2)).sort()
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(object2, key) && Object.prototype.hasOwnProperty.call(object1, key)) {
      if (object1[key] === object2[key]) {
        result.push(`   ${key}: ${object1[key]}`)
      }
      else {
        result.push(` - ${key}: ${object1[key]}`)
        result.push(` + ${key}: ${object2[key]}`)
      }
    }
    else {
      if (Object.prototype.hasOwnProperty.call(object1, key)) {
        result.push(` - ${key}: ${object1[key]}`)
      }
      else {
        result.push(` + ${key}: ${object2[key]}`)
      }
    }
  }
  return '{\n' + result.join('\n') + '\n}'
}
