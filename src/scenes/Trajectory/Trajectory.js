import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import * as d3 from 'd3'

import { fetchCounts } from '../../shared/services/counts'
import Page from '../../shared/components/Page/Page'

import useProcessor from './helpers/processor'
import cleanupData from './helpers/data-cleanup'
import AxisX from './components/AxisX/AxisX'
import AxisY from './components/AxisY/AxisY'

export default function Trajectory() {
  const [ data, setData ] = useState(null)
  window.page_data = data

  useEffect(() => {
    fetchCounts('states').then(
      (data) => setData(cleanupData(data, [ '_', 'Nevada' ])),
    )
  }, [])

  const {
    width,
    height,
    margin,
    xScale,
    yScale,
    makeLine,
    color,
    master,
  } = useProcessor(data)

  if (!data) return null

  // https://github.com/d3/d3/blob/master/API.md
  // https://observablehq.com/@d3/connected-scatterplot
  return (
    <Page title="Growth Per Infection">
      <svg viewBox={[ 0, 0, width, height ]}>
        <AxisX
          scale={xScale}
          width={width}
          height={height}
          margin={margin}
          label="Current Infections"
        />
        <AxisY
          scale={yScale}
          width={width}
          height={height}
          margin={margin}
          label="New Infections"
        />
        {Object.entries(data).map(([ id, data ]) => (
          <path
            key={id}
            id={id}
            fill="none"
            stroke={color(id)}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            d={makeLine(data)}
            ref={animate(makeLine, data, master)}
          />
        ))}
      </svg>

      <Typography component="blockquote">Based on <a href="https://www.youtube.com/watch?v=54XLXg4fYsc" target="_blank" rel="noopener noreferrer">the methods of Grant Sanderson and Aatish Bhatia</a>.</Typography>
    </Page>
  )
}

function animate(makeLine, data, master) {
  const end = getLength(makeLine(data))

  const fromDate = d3.scaleLinear()
    .domain(d3.extent(master, (point) => point.date))
    .range([ 0, 1 ])
  const fromLength = d3.scaleLinear()
    .domain([ 0, end ])
    .range([ 0, 1 ])

  const ease = d3.scaleLinear()
    .domain(data.map((point) => fromDate(point.date)))
    .range(data.map((point, index) => fromLength(getLength(makeLine(data.slice(0, index + 1))))))
    .clamp(true)

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

function getLength(path) {
  return d3.create('svg:path').attr('d', path).node().getTotalLength()
}
