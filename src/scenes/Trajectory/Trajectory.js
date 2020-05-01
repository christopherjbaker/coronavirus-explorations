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
    (async () => {
      const dataRaw = await fetchCounts('states')
      const data = _.filter(({ state }) => state === 'Nevada', dataRaw)

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

        return [
          {
            date: point.date,
            total: point.cases,
            growth: previous.growth * (1 - 1 / correction) + growth,
            type: 'intermediate',
          },
          {
            date: new Date(previous.date.valueOf() + LIMIT * 24 * 60 * 60 * 1000),
            total: previous.total + projectedGrowth,
            growth: projectedGrowth,
            type: 'extrapolated',
          },
        ]
      })()

      setData(extrapolated ? _.concat(counts, extrapolated) : counts)
    })()
  }, [])

  if (!data) return null

  const width = 864
  const height = Math.round(width * ((Math.sqrt(5) - 1) / 2))
  const margin = { top: 20, right: 20, bottom: 30, left: 40 }

  const getX = (point) => point.total
  const getY = (point) => point.growth

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, getX)).nice()
    .range([ margin.left, width - margin.right ])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, getY)).nice()
    .range([ height - margin.bottom, margin.top ])

  // const xTicks = xScale.ticks(10)
  // const yTicks = yScale.ticks(10)

  // const xFormat = xScale.tickFormat(10)
  // const yFormat = yScale.tickFormat(10)

  const line = d3.line()
    .curve(d3.curveCatmullRom)
    .x((point) => xScale(getX(point)))
    .y((point) => yScale(getY(point)))

  const transition = d3.transition()
    .duration(500)
    .ease(d3.easeLinear)

  // https://github.com/d3/d3/blob/master/API.md
  // https://observablehq.com/@d3/connected-scatterplot
  return (
    <Page title="Growth Per Infection">
      <svg viewBox={[ 0, 0, width, height ]}>
        <path
          fill="none"
          stroke="black"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          d={line(data)}
          ref={animate(transition, 'stroke-dasharray', 0, length(line(data)))}
        />
      </svg>

      <Typography component="blockquote">Based on <a href="https://www.youtube.com/watch?v=54XLXg4fYsc" target="_blank" rel="noopener noreferrer">the methods of Grant Sanderson and Aatish Bhatia</a>.</Typography>
    </Page>
  )
}

function length(path) {
  return d3.create('svg:path').attr('d', path).node().getTotalLength()
}

function animate(transition, attribute, start, end) {
  return (ref) => {
    transition.tween('', () => (value) => {
      ref.setAttribute(attribute, `${start + (end - start) * value},${end}`)
    })
  }
}

function isNth(n) {
  let i = 0
  return () => i++ % n === 0
}