import { isObject } from '../utils.js'

const getIndent = (depth) => {
  return '    '.repeat(depth)
}

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return String(value)
  }
  const keys = Object.keys(value)
  const result = keys.map((key) => {
    if (isObject(value[key])) {
      return `${getIndent(depth + 1)}${key}: ${stringify(value[key], depth + 1)}`
    }
    return `${getIndent(depth + 1)}${key}: ${value[key]}`
  })
  return `{\n${result.join('\n')}\n${getIndent(depth)}}`
}

const formatTree = (tree, depth) => {
  return tree.map(node => formatNode(node, depth)).join('\n')
}

const formatNode = (node, depth) => {
  switch (node.type) {
    case 'added' : {
      return `${getIndent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`
    }
    case 'removed' : {
      return `${getIndent(depth)}  - ${node.key}: ${stringify(node.value, depth + 1)}`
    }
    case 'unchanged' : {
      return `${getIndent(depth)}    ${node.key}: ${stringify(node.value, depth + 1)}`
    }
    case 'changed' : {
      return `${getIndent(depth)}  - ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${getIndent(depth)}  + ${node.key}: ${stringify(node.newValue, depth + 1)}`
    }
    case 'nested' : {
      return `${getIndent(depth + 1)}${node.key}: {\n${formatTree(node.children, depth + 1)}\n${getIndent(depth + 1)}}`
    }
    default: {
      return 'Error'
    }
  }
}

export const stylishFormat = function (data) {
  const result = data.map((node) => {
    return formatNode(node, 0)
  })
  return '{\n' + result.join('\n') + '\n}'
}
