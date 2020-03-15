/* istanbul ignore file */
/* eslint-disable max-len */
import React, { useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import Icon from '../../components/Icon/Icon'

const levels = [
  { test: (threshold, { today }) => today > threshold, severity: 'error', label: 'Close immediately!' },
  { test: (threshold, { tomorrow }) => tomorrow > threshold, severity: 'warning', label: 'Close before tomorrow.' },
  { test: (threshold, { week }) => week > threshold, severity: 'info', label: 'Close within a week.' },
  { test: () => true, severity: 'success', label: 'No need to close this coming week.' },
]

const useStyles = makeStyles(() => ({
  label: {
    whiteSpace: 'nowrap',
  },
}))

export default function Recommendations() {
  const classes = useStyles()

  const [ risk, setRisk ] = useState('')
  const [ employees, setEmployees ] = useState('')
  const [ population, setPopulation ] = useState('')
  const [ cases, setCases ] = useState('')
  const [ deaths, setDeaths ] = useState('')

  const probabilities = useMemo(() => {
    if (!employees || !population) return null
    if (!cases && !deaths) return null

    return {
      // cases: cases ? pCases(population, employees, cases) : null,
      deaths: deaths ? pDeaths(population, employees, deaths) : null,
    }
  }, [ employees, population, cases, deaths ])

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
            id="employees"
            type="number"
            fullWidth
            label="How many employees do you have?"
            value={employees}
            onChange={(e) => setEmployees(e.target.value && +e.target.value)}
            InputLabelProps={{ className: classes.label }}
            InputProps={{
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
            label="What is the area population?"
            value={population}
            onChange={(e) => setPopulation(e.target.value && +e.target.value)}
            InputLabelProps={{ className: classes.label }}
            InputProps={{
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
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name="skull-crossbones" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

function pDeaths(population, employees, deaths) {
  const pFatality = 0.0087
  const tDeath = 17.3
  const tDouble = 6.18

  const nCases = deaths / pFatality

  const nToday = nCases * 2 ** (tDeath / tDouble)
  const nTomorrow = nToday * 2 ** (1 / tDouble)
  const nWeek = nToday * 2 ** (7 / tDouble)

  const pToday = nToday / population
  const pTomorrow = nTomorrow / population
  const pWeek = nWeek / population

  return {
    today: 1 - (1 - pToday) ** employees,
    tomorrow: 1 - (1 - pTomorrow) ** employees,
    week: 1 - (1 - pWeek) ** employees,
  }
}
