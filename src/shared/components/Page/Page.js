import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const pageTitle = document.title

export default function Page({ title, subtitle, children, ...props }) {
  useEffect(() => {
    document.title = `${title} | ${pageTitle}`
  }, [ title ])

  return (
    <Paper>
      <Box p={3} {...props}>
        {title && (
          <Typography variant="h1" gutterBottom>{title}</Typography>
        )}

        {children}
      </Box>
    </Paper>
  )
}

Page.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
}
