import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import _ from 'lodash/fp'
import * as d3 from 'd3'

import { fetchCounts } from '../../shared/services/counts'
import Page from '../../shared/components/Page/Page'

const LIMIT = 7

export default function Trajectory() {
  const [ data, setData ] = useState(null)

  useEffect(() => {
    fetchCounts('states').then((data) => {
      setData(_.flow([
        _.groupBy('state'),
        _.mapValues(processData),
        _.set('_', _.flow([
          _.groupBy('date'),
          _.values,
          _.map((items) => ({
            date: items[0].date,
            cases: _.flow([
              _.map(_.get('cases')),
              _.sum,
            ])(items),
            deaths: _.flow([
              _.map(_.get('deaths')),
              _.sum,
            ])(items),
          })),
          // _.filter((item) => item.cases > 20),
          processData,
        ])(data)),
      ])(data))
    })
  }, [])

  if (!data) return null
  const master = data._

  const width = 864
  const height = Math.round(width * ((Math.sqrt(5) - 1) / 2))
  const margin = { top: 20, right: 20, bottom: 30, left: 40 }

  const getX = (point) => Math.max(point.total, 1)
  const getY = (point) => Math.max(point.growth, 1)

  const xScale = d3.scaleLog()
    .domain([ 1, d3.max(master, getX) ])
    .range([ margin.left, width - margin.right ])

  const yScale = d3.scaleLog()
    .domain([ 1, d3.max(master, getY) ])
    .range([ height - margin.bottom, margin.top ])

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(Object.keys(data))

  // const xTicks = xScale.ticks(10)
  // const yTicks = yScale.ticks(10)

  // const xFormat = xScale.tickFormat(10)
  // const yFormat = yScale.tickFormat(10)

  const line = d3.line()
    .curve(d3.curveCatmullRom)
    .x((point) => xScale(getX(point)))
    .y((point) => yScale(getY(point)))

  // https://github.com/d3/d3/blob/master/API.md
  // https://observablehq.com/@d3/connected-scatterplot
  return (
    <Page title="Growth Per Infection">
      <svg viewBox={[ 0, 0, width, height ]}>
        {Object.entries(data).map(([ state, data ]) => (
          <path
            key={state}
            state={state}
            fill="none"
            stroke={colorScale(state)}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            d={line(data)}
            ref={animate(line, data, master)}
          />
        ))}
      </svg>

      <Typography component="blockquote">Based on <a href="https://www.youtube.com/watch?v=54XLXg4fYsc" target="_blank" rel="noopener noreferrer">the methods of Grant Sanderson and Aatish Bhatia</a>.</Typography>
    </Page>
  )
}

function processData(data) {
  const firstIndex = LIMIT === 7 ? _.findIndex(({ date }) => date.getDay() === 0, data) : 0
  const lastIndex = firstIndex + LIMIT * Math.floor((data.length - firstIndex) / LIMIT)

  let lastCasesCache = null

  const counts = _.flow([
    _.slice(firstIndex, lastIndex + 1),
    _.filter(isNth(LIMIT)),
    _.map(({ date, cases }) => {
      if (lastCasesCache === null) {
        lastCasesCache = cases
        return null
      }

      const lastCases = lastCasesCache
      lastCasesCache = cases

      return {
        date,
        total: cases,
        growth: cases - lastCases,
      }
    }),
    _.compact,
  ])(data)

  const extrapolated = lastIndex < data.length - 1 && (() => {
    const previous = _.last(counts)
    const point = _.last(data)

    const correction = LIMIT / (data.length - lastIndex - 1)
    const growth = point.cases - previous.total
    const projectedGrowth = growth * correction

    return _.compact([
      {
        date: point.date,
        total: point.cases,
        growth: previous.growth * (1 - 1 / correction) + growth,
        type: 'intermediate',
      },
      false && {
        date: new Date(previous.date.valueOf() + LIMIT * 24 * 60 * 60 * 1000),
        total: previous.total + projectedGrowth,
        growth: projectedGrowth,
        type: 'extrapolated',
      },
    ])
  })()

  return extrapolated ? _.concat(counts, extrapolated) : counts
}

function getLength(path) {
  return d3.create('svg:path').attr('d', path).node().getTotalLength()
}

function animate(line, data, master) {
  const end = getLength(line(data))

  const fromDate = d3.scaleLinear()
    .domain(d3.extent(master, (point) => point.date))
    .range([ 0, 1 ])
  const fromLength = d3.scaleLinear()
    .domain([ 0, end ])
    .range([ 0, 1 ])

  const ease = d3.scaleLinear()
    .domain(data.map((point) => fromDate(point.date)))
    .range(data.map((point, index) => fromLength(getLength(line(data.slice(0, index))))))

  return (ref) => {
    if (ref) {
      d3.select(ref)
        .attr('stroke-dasharray', `0,${end}`)
        .transition()
        .duration(5000)
        .ease(ease)
        .attr('stroke-dasharray', `${end},${end}`)
    }
  }
}

function isNth(n) {
  let i = 0
  return () => i++ % n === 0
}
