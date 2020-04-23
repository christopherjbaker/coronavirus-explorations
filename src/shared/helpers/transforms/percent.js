import toNumber from './number'

export default function toPercent(input, places = 0) {
  if (typeof input === 'number') {
    input *= 100
  }

  return `${toNumber(input, places)}%`
}
