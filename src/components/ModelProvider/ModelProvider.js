import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import useFatalityRate from './hooks/fatality-rate'
import useShareOfSpread from './hooks/share-of-spread'
import useTimeToDeath from './hooks/time-to-death'
import useTimeToDouble from './hooks/time-to-double'

const Context = React.createContext()

export default function ModelProvider({ children }) {
  return (
    <Context.Provider>
      {children}
    </Context.Provider>
  )
}

ModelProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useData() {
  return useContext(Context)
}

export function useCasesModel(population, sample, cases) {
  const tDouble = useTimeToDouble()
  const rShare = useShareOfSpread(cases)

  if (!sample || !population) return null

  const nToday = cases / rShare.foreign

  return calculateModel(nToday, tDouble, population, sample)
}

export function useDeathsModel(population, sample, deaths) {
  const tDouble = useTimeToDouble()
  const pFatality = useFatalityRate()
  const tDeath = useTimeToDeath()

  if (!sample || !population) return null

  const nCases = deaths / pFatality
  const nToday = nCases * 2 ** (tDeath / tDouble)

  return calculateModel(nToday, tDouble, population, sample)
}

function calculateModel(nToday, tDouble, population, sample) {
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
