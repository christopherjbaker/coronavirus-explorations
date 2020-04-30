import { useEffect, useState } from 'react'

const sources = {
  states: async () => {
    const response = await fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
    const raw = await response.text()
    const data = parseCSV(raw)

    return data
  },
}

export default function useCounts(source) {
  if (!sources[source]) {
    throw new Error(`Unknown source: ${source}`)
  }

  const [ counts, setCounts ] = useState(null)

  useEffect(() => {
    sources[source]().then(setCounts)
  }, [ source ])

  return counts
}

function parseCSV(input) {
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

function parseValue(input) {
  if (input.match(/^[+-]?[0-9]+(\.[0-9]+)?$/)) {
    return parseFloat(input)
  }

  if (input.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
    return new Date(input)
  }

  return input
}
