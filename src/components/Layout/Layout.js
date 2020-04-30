import PropTypes from 'prop-types'
import React from 'react'
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom'
import {
  CssBaseline,
  AppBar,
  Container,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core'

export default function Layout({ title, tabs, children, ...props }) {
  const { pathname } = useLocation()
  const tab = tabs.findIndex(({ to: path, ...props }) => matchPath(pathname, { path, ...props }))

  return (
    <Container maxWidth="md" {...props}>
      <CssBaseline />
      <Typography variant="h1" gutterBottom>{title}</Typography>

      <AppBar position="static">
        <Tabs aria-label="navigation" value={tab < 0 ? false : tab}>
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

      {children}
    </Container>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequire,
    exact: PropTypes.bool,
  })).isRequired,
  children: PropTypes.node.isRequired,
}
