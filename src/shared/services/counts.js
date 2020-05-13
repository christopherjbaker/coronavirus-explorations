import { parseCSV } from './csv'

const sources = {
  states: async () => {
    const response = await fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
    const raw = await response.text()
    const data = parseCSV(raw)

    return data
  },
  counties: async () => {
    const response = await fetch('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv')
    const raw = await response.text()
    const data = parseCSV(raw)

    return data
  },
}

export function fetchCounts(source) {
  if (!sources[source]) {
    throw new Error(`Unknown source: ${source}`)
  }

  return sources[source]()
}
