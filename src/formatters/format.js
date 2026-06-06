import { stylishFormat } from './stylish.js'
import { planeFormat } from './plane.js'
import { formatToJSON } from './toJson.js'

export const formatData = (data, format = 'stylish') => {
  switch (format) {
    case 'stylish' : {
      return stylishFormat(data)
    }
    case 'plain' : {
      return '\n' + planeFormat(data, [])
    }
    case 'json' : {
      return formatToJSON(data)
    }
    default: {
      return 'Unknown format'
    }
  }
}
