/* istanbul ignore file */
/* eslint-disable max-len */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core'

import { toNumber } from '../../helpers/transforms'
import { useModel } from '../../components/ModelProvider/ModelProvider'
import Icon from '../../components/Icon/Icon'

import RecommendationDetails from './components/RecommendationDetails/RecommendationDetails'

const levels = [
  {
    test: (threshold, { today }) => today > threshold,
    label: 'Cancel immediately!',
    severity: 'error',
  },
  {
    test: (threshold, { tomorrow }) => tomorrow > threshold,
    label: 'Today is within risk tolerance. Cancel for tomorrow.',
    severity: 'warning',
  },
  {
    test: (threshold, { week }) => week > threshold,
    label: 'Tomorrow is within risk tolerance, but this week is not. Cancel soon.',
    severity: 'info',
  },
  {
    test: (threshold, { fortnight }) => fortnight > threshold,
    label: 'This week is within risk tolerance, but next week is not. Cancel soon.',
    severity: 'info',
  },
  {
    test: () => true,
    label: 'The next two weeks are within risk tolerance.',
    severity: 'success',
  },
]

const useStyles = makeStyles(() => ({
  label: {
    whiteSpace: 'nowrap',
  },
}))

export default function Recommendations() {
  const classes = useStyles()

  const [ dialog, setDialog ] = useState(null)

  const [ risk, setRisk ] = useState(1)
  const [ sample, setSample ] = useState(120)
  const [ population, setPopulation ] = useState(248853)
  const [ cases, setCases ] = useState(12)
  const [ deaths, setDeaths ] = useState(1)

  const pCases = useModel(sample, population, { cases, deaths })

  function handleDialogClose() {
    setDialog(null)
  }

  const level = risk && pCases && levels.find(({ test }) => test(risk / 100, pCases))

  return (
    <div>
      <Typography variant="h2" gutterBottom>How safe is your group?</Typography>

      <Grid container spacing={3}>
        {level ? (
          <Grid item xs={12}>
            <Alert
              variant="filled"
              elevation={6}
              severity={level.severity}
              onClick={() => setDialog('details')}
            >
              {level.label} Click for more information.
            </Alert>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Alert
              variant="standard"
              elevation={6}
              severity="info"
            >
              Fill out the form to get a recommendation.
            </Alert>
          </Grid>
        )}

        <Grid item container direction="column" xs={12} sm={6} spacing={3}>
          <Grid item>
            <TextField
              id="risk"
              type="number"
              fullWidth
              label="What risk are you willing to take?"
              value={risk}
              onChange={(e) => setRisk(e.target.value && +e.target.value)}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="percent" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="sample"
              type="number"
              fullWidth
              label="What is the size of your sample?"
              value={sample}
              onChange={(e) => setSample(e.target.value && +e.target.value)}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                inputComponent: CommaNumberInput,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="tally" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="population"
              type="number"
              fullWidth
              label="What is the size of your population?"
              value={population}
              onChange={(e) => setPopulation(e.target.value && +e.target.value)}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                inputComponent: CommaNumberInput,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="globe-americas" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6} spacing={3}>
          <Grid item>
            <TextField
              id="cases"
              type="number"
              fullWidth
              label="Total cases as of today"
              value={cases}
              onChange={(e) => setCases(e.target.value && +e.target.value)}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                inputComponent: CommaNumberInput,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="disease" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="deaths"
              type="number"
              fullWidth
              label="Total deaths as of today"
              value={deaths}
              onChange={(e) => setDeaths(e.target.value && +e.target.value)}
              InputLabelProps={{ className: classes.label }}
              InputProps={{
                inputComponent: CommaNumberInput,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="skull-crossbones" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {pCases && dialog === 'details' && (
        <RecommendationDetails
          id="details"
          onClose={handleDialogClose}
          chances={pCases}
        />
      )}
    </div>
  )
}


function CommaNumberInput({ inputRef, onBlur, onFocus, value, ...props }) {
  const [ editing, setEditing ] = useState(false)

  return editing ? (
    <input
      ref={inputRef}
      {...props}
      value={value}
      onFocus={onFocus}
      // eslint-disable-next-line no-sequences
      onBlur={(...args) => (setEditing(false), onBlur(...args))}
    />
  ) : (
    <input
      ref={inputRef}
      {...props}
      readOnly
      type="text"
      value={toNumber(value)}
      onBlur={onBlur}
      // eslint-disable-next-line no-sequences
      onFocus={(...args) => (setEditing(true), onFocus(...args))}
    />
  )
}

CommaNumberInput.propTypes = {
  inputRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}
