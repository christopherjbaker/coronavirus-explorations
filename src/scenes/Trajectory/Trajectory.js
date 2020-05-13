import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'

import { fetchCounts } from '../../shared/services/counts'
import Page from '../../shared/components/Page/Page'

import useProcessor from './helpers/processor'
import cleanupData from './helpers/data-cleanup'
import AxisX from './components/AxisX/AxisX'
import AxisY from './components/AxisY/AxisY'

const useStyles = makeStyles({
  line: {
    'pointer-events': 'none',
  },
  label: {
    display: 'none',
    '*:hover > &': {
      display: 'inline',
    },
  },
})

export default function Trajectory() {
  const classes = useStyles()
  const [ data, setData ] = useState(null)
  window.page_data = data

  useEffect(() => {
    fetchCounts('counties').then(
      (data) => setData(cleanupData(
        data,
        (row) => `${row.state}, ${row.county}`,
        (row) => row.state === 'Nevada',
        [ 'Nevada, Washoe', 'Nevada, Clark' ],
      )),
    )
  }, [])

  const {
    width,
    height,
    margin,
    xScale,
    yScale,
    makeLine,
    makeTransform,
    color,
    master,
  } = useProcessor(data)

  if (!data) return null

  // https://github.com/d3/d3/blob/master/API.md
  // https://observablehq.com/@d3/connected-scatterplot
  return (
    <Page title="Coronavirus Trajectory">
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
        <g data-label="lines">
          {Object.entries(data).map(([ label, data ]) => {
            const index = data.findIndex((point) => point.type === 'extrapolated')
            const normal = index < 0 ? data : data.slice(0, index)
            const extrapolated = index < 0 ? null : data.slice(index - 1)

            return (
              <g key={label} data-label={label}>
                <path
                  fill="none"
                  stroke={color(label)}
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d={makeLine(normal)}
                  ref={animate(makeLine, normal, master)}
                  className={classes.line}
                />
                {extrapolated && (
                  <path
                    fill="none"
                    stroke={color(label)}
                    strokeOpacity={0.5}
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    d={makeLine(extrapolated)}
                    ref={animate(makeLine, extrapolated, master)}
                    className={classes.line}
                  />
                )}
              </g>
            )
          })}
        </g>
        <g data-label="points">
          {Object.entries(data).map(([ label, data ]) => (
            <g key={label} data-label={label}>
              {data.map((point) => (
                <circle
                  key={point.date}
                  fill="white"
                  stroke={color(label)}
                  strokeOpacity={point.type === 'extrapolated' ? 0.5 : null}
                  strokeWidth={2}
                  transform={makeTransform(point)}
                  r={3}
                />
              ))}
            </g>
          ))}
        </g>
        <g data-label="labels">
          {Object.entries(data).map(([ label, data ]) => (
            <g key={label} data-label={label}>
              {data.map((point) => (
                <g key={point.date} transform={makeTransform(point)}>
                  <circle fill="transparent" r={4} />
                  <g className={classes.label}>
                    <Typography
                      variant="subtitle2"
                      component="text"
                      dx="0.75em"
                      dy="0.32em"
                      textAnchor="start"

                      fill="none"
                      stroke="white"
                      strokeWidth={4}
                      strokeLinejoin="round"
                    >
                      {point.date.toDateString()}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="text"
                      dx="0.75em"
                      dy="0.32em"
                      textAnchor="start"
                    >
                      {point.date.toDateString()}
                    </Typography>
                  </g>
                </g>
              ))}
            </g>
          ))}
        </g>
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
