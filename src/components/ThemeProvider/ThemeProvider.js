import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const themeDefault = createMuiTheme()

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        'blockquote&': {
          paddingLeft: themeDefault.spacing(3),
          borderLeft: `${themeDefault.spacing(0.5)}px solid ${themeDefault.palette.primary.main}`,
          fontStyle: 'italic',
        },
      },
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
