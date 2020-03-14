import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

export default function NotFound() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>Oops! Page Not Found</Typography>
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
    </div>
  )
}
