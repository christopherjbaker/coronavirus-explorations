import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const baseTheme = {
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
}

const lightTheme = createMuiTheme({
  ...baseTheme,
})
const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    type: 'dark',
  },
})

export default function ThemeProvider({ isDark, children }) {
  const theme = isDark ? darkTheme : lightTheme

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  /** TEMPORARY. */
  isDark: PropTypes.bool.isRequired,
  /** Child elements of this component. */
  children: PropTypes.node.isRequired,
}
