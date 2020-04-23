import useTrueCases from './true-cases'
import useTimeToDouble from './time-to-double'

export default function useModel(sample, population, data) {
  const nToday = useTrueCases(data)
  const tDouble = useTimeToDouble()

  if (!sample || !population) return null

  const nTomorrow = nToday * 2 ** (1 / tDouble)
  const nWeek = nToday * 2 ** (7 / tDouble)
  const nFortnight = nToday * 2 ** (14 / tDouble)

  const pToday = nToday / population
  const pTomorrow = nTomorrow / population
  const pWeek = nWeek / population
  const pFortnight = nFortnight / population

  return {
    personal: pToday,
    today: 1 - (1 - pToday) ** sample,
    tomorrow: 1 - (1 - pTomorrow) ** sample,
    week: 1 - (1 - pWeek) ** sample,
    fortnight: 1 - (1 - pFortnight) ** sample,
  }
}
