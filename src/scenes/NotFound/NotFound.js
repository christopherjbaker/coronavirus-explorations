import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

import Page from '../../shared/components/Page/Page'

export default function NotFound() {
  return (
    <Page title="Oops! Page Not Found">
      <Typography paragraph>
        Something went wrong. The page you are looking for could not be found.
      </Typography>
      <Typography paragraph>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          Go Home
        </Button>
      </Typography>
    </Page>
  )
}
