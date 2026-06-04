import _ from 'lodash'
import { parse } from 'yaml'

export const parseFile = function (fileData, ext) {
  switch (ext) {
    case '.json':
      return JSON.parse(fileData)
    case '.yml':
    case '.yaml':
      return parse(fileData)
    default:
      throw new Error('Неизвестный формат файла')
  }
}

const isObject = (value) => {
  return value !== null && typeof value === 'object'
}


const getNode = (key, object1, object2) => {
  const value1 = object1[key];
  const value2 = object2[key];
  if (!Object.hasOwn(object1, key)) {
    return {
      key,
      type: "added",
      value: value2
    }
  }
  if (!Object.hasOwn(object2, key)) {
    return {
      key,
      type: "removed",
      value: value1
    }
  }
  if (isObject(value1) && isObject(value2)) {
    return {
      key,
      type: "nested",
      children: compare(value1, value2)
    }
  }
  else {
    if (value1 === value2) {
      return {
        key,
        type: "unchanged",
        value: value1
    }
    }
    else {
      return {
        key,
        type: "changed",
        oldValue: value1,
        newValue: value2
      }
    }
  }
}

const getIndent = (depth) => {
  return "    ".repeat(depth);
}

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return String(value);
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    if(isObject(value[key])) {
      return `${getIndent(depth + 1)}${key}: ${stringify(value[key], depth + 1)}`;
    }
    return `${getIndent(depth + 1)}${key}: ${value[key]}`;
  });
  return `{\n${result.join("\n")}\n${getIndent(depth)}}`;
}

const formatTree = (tree, depth) => {
  return tree.map((node) => formatNode(node, depth)).join('\n');
};

const formatNode = (node, depth) => {
  switch (node.type) {
    case "added" : {
      return `${getIndent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`
    }
    case "removed" : {
      return `${getIndent(depth)}  - ${node.key}: ${stringify(node.value, depth + 1)}`
    }
    case "unchanged" : {
      return `${getIndent(depth)}    ${node.key}: ${stringify(node.value, depth + 1)}`
    }
    case "changed" : {
      return `${getIndent(depth)}  - ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${getIndent(depth)}  + ${node.key}: ${stringify(node.newValue, depth + 1)}`
    }
    case "nested" : {
      return `${getIndent(depth + 1)}${node.key}: {\n${formatTree(node.children, depth + 1)}\n${getIndent(depth + 1)}}`;
    }
    default: {
      return "Error"
    }
  }
}

export const compare = function (object1, object2) {
  const keys = _.union(Object.keys(object1), Object.keys(object2)).sort()
  const result = keys.map((key) => {
    return getNode(key, object1, object2);
  })
  return result;
}

export const format = function (data) {
  const result = data.map((node) => {
    return formatNode(node, 0);
  })
  return "{\n" + result.join("\n") + "\n}";
}

const formatObject = (value) => {
  if (!isObject(value)) {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return String(value);
  }
  else {
    return "[complex value]";
  }
}

const formatRow = (node, path) => {
  const newPath = [...path, node.key];
  const keyPath = newPath.join(".")
  switch (node.type) {
    case "added" : {
      return `Property '${keyPath}' was added with value: ${formatObject(node.value)}`;
    }
    case "removed" : {
      return `Property '${keyPath}' was removed`;
    }
    case "unchanged" : {
      return;
    }
    case "changed" : {
      return `Property '${keyPath}' was updated. From ${formatObject(node.oldValue)} to ${formatObject(node.newValue)}`;
    }
    case "nested" : {
      return plateFormat(node.children, newPath);
    }
    default: {
      return "Error"
    }
  }
}

export const plateFormat = function(data, path) {
  const result = data.map((node) => {
    return formatRow(node, path);
  })
  return result.filter(Boolean).join("\n");
}

export const formatToJSON = (data) => {
  return JSON.stringify(data, null, 2);
}