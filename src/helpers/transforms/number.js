export default function toNumber(input, places = 0) {
  if (typeof input === 'number') {
    input = input.toFixed(places)
  }

  return input.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
