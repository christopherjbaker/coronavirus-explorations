export default function meanWeightedArithmetic(inputs, key = 'mean') {
  const data = inputs.filter((row) => typeof row[key] === 'number')

  const sum = data.reduce((sum, row) => sum + row.weight * row[key], 0)
  const weight = data.reduce((sum, row) => sum + row.weight, 0)

  return sum / weight
}
