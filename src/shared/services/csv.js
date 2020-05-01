export function parseCSV(input) {
  const [ header, ...lines ] = input.split('\n').map((line) => line.trim().split(','))

  const data = lines.map(
    (line) => line.reduce(
      (acc, value, index) => {
        acc[header[index]] = parseValue(value)
        return acc
      },
      {},
    ),
  )

  return data
}

export function parseValue(input) {
  if (input.match(/^[+-]?[0-9]+(\.[0-9]+)?$/)) {
    return parseFloat(input)
  }

  if (input.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return new Date(input)
  }

  return input
}
