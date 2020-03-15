import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '3.25rem',
        fontWeight: 300,
      },
      h2: {
        fontSize: '2.75rem',
        fontWeight: 300,
      },
      h3: {
        fontSize: '2.25rem',
        fontWeight: 400,
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 400,
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 400,
      },
      h6: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
    },
    MuiIcon: {
      root: {
        width: '1.25em',
        textAlign: 'center',
      },
    },
  },
})

export default function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  /** Child elements of this component. */
  children: PropTypes.node.isRequired,
}
