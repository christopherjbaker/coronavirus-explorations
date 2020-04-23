import PropTypes from 'prop-types'
import React, { useContext } from 'react'

export { default as useModel } from './hooks/model'

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
