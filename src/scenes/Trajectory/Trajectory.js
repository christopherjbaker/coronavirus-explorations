/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import * as d3 from 'd3'

import useCounts from '../../shared/stores/counts'
import Page from '../../shared/components/Page/Page'

export default function Trajectory() {
  const [ data, setData ] = useState(null)
  const dataAll = useCounts('states')

  useEffect(() => {
    if (!dataAll) return setData(null)

    let lastCache = null

    return setData(dataAll
      .filter(({ state }) => state === 'Nevada')
      .map(({ date, cases }, index) => {
        const last = lastCache
        lastCache = cases
        if (index === 0) {
          return null
        }

        return {
          date,
          total: cases,
          growth: cases - last,
        }
      })
      .filter((point) => point))
  }, [ dataAll ])

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

  const xTicks = xScale.ticks(10)
  const yTicks = yScale.ticks(10)

  const xFormat = xScale.tickFormat(10)
  const yFormat = yScale.tickFormat(10)

  const line = d3.line()
    .curve(d3.curveCatmullRom)
    .x((point) => xScale(getX(point)))
    .y((point) => yScale(getY(point)))

  const transition = d3.transition()
    .duration(5000)
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

function animate2(length) {
  let timer = null

  return (ref) => {
    if (!ref) {
      timer = clearTimeout(timer)
    }

    const start = Date.now()
    timer = setTimeout(() => {
      ref.setAttribute('strokeDasharray', `${length},${length}`)
    }, 1000 / 30)
  }
}
