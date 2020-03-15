import PropTypes from 'prop-types'
import React from 'react'
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom'
import {
  CssBaseline,
  AppBar,
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core'

const tabs = [
  { label: 'Info', to: '/', exact: true },
  { label: 'Calculations', to: '/calculations' },
]

export default function Layout({ children, ...props }) {
  const { pathname } = useLocation()

  const tab = tabs.findIndex(({ to: path, ...props }) => matchPath(pathname, { path, ...props }))

  return (
    <Container maxWidth="md" {...props}>
      <CssBaseline />
      <Typography variant="h1" gutterBottom>Coronavirus Work From Home Model</Typography>

      <AppBar position="static">
        <Tabs value={tab < 0 ? false : tab}>
          {tabs.map(({ label, to }) => (
            <Tab
              key={to}
              component={RouterLink}
              to={to}
              label={label}
            />
          ))}
        </Tabs>
      </AppBar>

      <Paper>
        <Box p={3}>
          {children}
        </Box>
      </Paper>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
