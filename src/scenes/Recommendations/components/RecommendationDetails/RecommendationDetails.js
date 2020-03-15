/* istanbul ignore file */
import PropTypes from 'prop-types'
import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'

import { toPercent, getSigfigs } from '../../../../helpers/transforms'

export default function RecommendationDetails({ id, label, onClose, chances }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog
      open
      fullScreen={fullScreen}
      onClose={onClose}
      aria-labelledby={`dialog-${id}-title`}
      aria-describedby={`dialog-${id}-description`}
    >
      <DialogTitle id={`dialog-${id}-title`}>
        Details of {label} Model Recommendations
      </DialogTitle>
      <DialogContent id={`dialog-${id}-description`}>
        <Typography paragraph>
          Probability that an individual is infected:
          <strong>{toPercent(chances.personal, getSigfigs)}</strong>
        </Typography>
        <Typography paragraph>
          Probability that at least one of your sample is infected:
        </Typography>
        <ul>
          <li>Today: <strong>{toPercent(chances.today, getSigfigs)}</strong></li>
          <li>Tomorrow: <strong>{toPercent(chances.tomorrow, getSigfigs)}</strong></li>
          <li>Within a week: <strong>{toPercent(chances.week, getSigfigs)}</strong></li>
          <li>Within two weeks: <strong>{toPercent(chances.fortnight, getSigfigs)}</strong></li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

RecommendationDetails.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  chances: PropTypes.shape({
    personal: PropTypes.number.isRequired,
    today: PropTypes.number.isRequired,
    tomorrow: PropTypes.number.isRequired,
    week: PropTypes.number.isRequired,
    fortnight: PropTypes.number.isRequired,
  }).isRequired,
}
