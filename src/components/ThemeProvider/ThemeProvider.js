import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const baseTheme = {
  overrides: {
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
