import useTimeToDeath from './useTimeToDeath'
import useTimeToDouble from './useTimeToDouble'

// Based on data from May 2020
// https://www.worldometers.info/coronavirus/coronavirus-death-rate/
const fCases = 10.01510639190331
const fDeaths = 1.780936454849498
const pFatality = 0.013824795062017

export default function useTrueCases({ cases, deaths }, type = 'cases') {
  const tDeath = useTimeToDeath()
  const tDouble = useTimeToDouble()

  if (type === 'cases') {
    return fCases * cases
  }

  if (type === 'deaths') {
    const nCases = fDeaths * deaths / pFatality
    return nCases * 2 ** (tDeath / tDouble)
  }

  throw new Error(`Unknown type ${type}`)
}
