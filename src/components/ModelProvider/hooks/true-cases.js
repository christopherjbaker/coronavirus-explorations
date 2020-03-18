import useFatalityRate from './fatality-rate'
import useShareOfSpread from './share-of-spread'
import useTimeToDeath from './time-to-death'
import useTimeToDouble from './time-to-double'

export default function useTrueCases({ cases, deaths }) {
  const type = 'cases'

  const rShare = useShareOfSpread(cases)
  const pFatality = useFatalityRate()
  const tDeath = useTimeToDeath()
  const tDouble = useTimeToDouble()

  if (type === 'cases') {
    if (!cases || !rShare) return null
    return cases / rShare.foreign
  }

  if (type === 'deaths') {
    if (!deaths || !pFatality || !tDouble) return null
    const nCases = deaths / pFatality
    return nCases * 2 ** (tDeath / tDouble)
  }

  throw new Error(`Unknown type: ${type}`)
}
