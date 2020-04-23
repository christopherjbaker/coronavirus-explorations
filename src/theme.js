import { createMuiTheme } from '@material-ui/core/styles'

const themeDefault = createMuiTheme()

export default createMuiTheme({
  typography: {
    fontSize: 16,

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
  overrides: {
    MuiTypography: {
      root: {
        'blockquote&': {
          paddingLeft: themeDefault.spacing(3),
          borderLeft: `${themeDefault.spacing(0.5)}px solid ${themeDefault.palette.primary.main}`,
          fontStyle: 'italic',
        },
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
