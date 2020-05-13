import PropTypes from 'prop-types'
import React from 'react'
import * as d3 from 'd3'

export default function AxisX({ scale, width, height, margin, label, ...props }) {
  // g.selectAll(".tick line").clone()
  //   .attr("y2", -height)
  //   .attr("stroke-opacity", 0.1))

  return (
    <g
      {...props}
      transform={`translate(0,${height - margin.bottom})`}
      ref={(ref) => d3.axisBottom(scale).ticks(null, '~s')(d3.select(ref))}
    >
      {label && (
        <>
          <text
            x={width - margin.space}
            y={-margin.space}
            fontWeight="bold"
            textAnchor="end"
            stroke="white"
            strokeWidth={4}
            strokeLinejoin="round"
          >
            {label}
          </text>
          <text
            x={width - margin.space}
            y={-margin.space}
            fontWeight="bold"
            textAnchor="end"
            fill="black"
          >
            {label}
          </text>
        </>
      )}
    </g>
  )
}

AxisX.propTypes = {
  scale: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    space: PropTypes.number.isRequired,
  }).isRequired,
  label: PropTypes.string,
}
