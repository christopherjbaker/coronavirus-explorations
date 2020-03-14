import PropTypes from 'prop-types'
import React from 'react'

export default function Layout({ children, ...props }) {
  return (
    <div {...props}>
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
