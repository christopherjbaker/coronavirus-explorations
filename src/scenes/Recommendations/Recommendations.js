/* istanbul ignore file */
/* eslint-disable max-len */
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core'

import { toNumber } from '../../helpers/transforms'
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
  const [ sample, setSample ] = useState(250)
  const [ population, setPopulation ] = useState(3096633)
  const [ cases, setCases ] = useState(30)
  const [ deaths, setDeaths ] = useState(4)

  const probabilities = useMemo(() => {
    if (!sample || !population) return null

    return {
      cases: cases ? null : null,
      // cases: cases ? pCases(population, sample, cases) : null,
      deaths: deaths ? pDeaths(population, sample, deaths) : null,
    }
  }, [ sample, population, cases, deaths ])

  function handleDialogClose() {
    setDialog(null)
  }

  const levelCases = risk && probabilities && probabilities.cases && levels.find(({ test }) => test(risk / 100, probabilities.cases))
  const levelDeaths = risk && probabilities && probabilities.deaths && levels.find(({ test }) => test(risk / 100, probabilities.deaths))

  return (
    <div>
      <Typography variant="h2" gutterBottom>When should you close your office?</Typography>

      <Grid container spacing={4}>
        {risk && probabilities ? (
          <>
            <Grid item xs={12} md={6}>
              {levelCases ? (
                <Alert
                  variant="filled"
                  elevation={6}
                  severity={levelCases.severity}
                  onClick={() => setDialog('cases')}
                >
                  {levelCases.label} Click for more information.
                </Alert>
              ) : (
                <Alert
                  variant="standard"
                  elevation={6}
                  severity="info"
                >
                  Enter the number of cases for a recommendation.
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {levelDeaths ? (
                <Alert
                  variant="filled"
                  elevation={6}
                  severity={levelDeaths.severity}
                  onClick={() => setDialog('deaths')}
                >
                  {levelDeaths.label} Click for more information.
                </Alert>
              ) : (
                <Alert
                  variant="standard"
                  elevation={6}
                  severity="info"
                >
                  Enter the number of deaths for a recommendation.
                </Alert>
              )}
            </Grid>
          </>
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

        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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

        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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

      {probabilities && probabilities.deaths && dialog === 'deaths' && (
        <RecommendationDetails
          id="deaths"
          label="Deaths-based"
          onClose={handleDialogClose}
          chances={probabilities.deaths}
        />
      )}
      {probabilities && probabilities.cases && dialog === 'cases' && (
        <RecommendationDetails
          id="cases"
          label="Cases-based"
          onClose={handleDialogClose}
          chances={probabilities.cases}
        />
      )}
    </div>
  )
}

function pDeaths(population, sample, deaths) {
  const pFatality = 0.008740613457
  const tDeath = 17.325
  const tDouble = 6.184

  const nCases = deaths / pFatality

  const nToday = nCases * 2 ** (tDeath / tDouble)
  const nTomorrow = nToday * 2 ** (1 / tDouble)
  const nWeek = nToday * 2 ** (7 / tDouble)
  const nFortnight = nToday * 2 ** (14 / tDouble)

  const pToday = nToday / population
  const pTomorrow = nTomorrow / population
  const pWeek = nWeek / population
  const pFortnight = nFortnight / population

  return {
    personal: pToday,
    today: 1 - (1 - pToday) ** sample,
    tomorrow: 1 - (1 - pTomorrow) ** sample,
    week: 1 - (1 - pWeek) ** sample,
    fortnight: 1 - (1 - pFortnight) ** sample,
  }
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
