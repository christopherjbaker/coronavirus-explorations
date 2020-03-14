export default function toNumber(input, places = 0) {
  return input.toFixed(places).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
