import { isObject } from '../utils.js'

const formatObject = (value) => {
  if (!isObject(value)) {
    if (typeof value === 'string') {
      return `'${value}'`
    }
    return String(value)
  }
  else {
    return '[complex value]'
  }
}

const formatRow = (node, path) => {
  const newPath = [...path, node.key]
  const keyPath = newPath.join('.')
  switch (node.type) {
    case 'added' : {
      return `Property '${keyPath}' was added with value: ${formatObject(node.value)}`
    }
    case 'removed' : {
      return `Property '${keyPath}' was removed`
    }
    case 'unchanged' : {
      return
    }
    case 'changed' : {
      return `Property '${keyPath}' was updated. From ${formatObject(node.oldValue)} to ${formatObject(node.newValue)}`
    }
    case 'nested' : {
      return planeFormat(node.children, newPath)
    }
    default: {
      return 'Error'
    }
  }
}

export const planeFormat = function (data, path) {
  const result = data.map((node) => {
    return formatRow(node, path)
  })
  return result.filter(Boolean).join('\n')
}
