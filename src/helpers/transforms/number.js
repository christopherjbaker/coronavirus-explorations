export default function toNumber(input, places = 0) {
  if (typeof input === 'number') {
    if (typeof places === 'function') {
      places = places(input)
    }

    input = input.toFixed(places)
  }

  const decimal = input.indexOf('.')
  const before = decimal < 0 ? input : input.slice(0, decimal)
  const after = decimal < 0 ? '' : input.slice(decimal)

  return before.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + after
}
