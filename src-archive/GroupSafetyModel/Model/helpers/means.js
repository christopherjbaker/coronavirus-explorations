export function meanArithmetic(inputs, key = 'mean') {
  const data = inputs.filter((row) => typeof row[key] === 'number')

  const sum = data.reduce((sum, row) => sum + (row.weight || 1) * row[key], 0)
  const weight = data.reduce((sum, row) => sum + (row.weight || 1), 0)

  return sum / weight
}

export function meanHarmonic(inputs, key = 'mean') {
  const data = inputs.filter((row) => typeof row[key] === 'number')

  const sum = data.reduce((sum, row) => sum + (row.weight || 1) / row[key], 0)
  const weight = data.reduce((sum, row) => sum + (row.weight || 1), 0)

  return weight / sum
}
