import PropTypes from 'prop-types'
import React from 'react'
import * as d3 from 'd3'

export default function AxisY({ scale, width, height, margin, label, ...props }) {
  // g.selectAll(".tick line").clone()
  //   .attr("y2", -width)
  //   .attr("stroke-opacity", 0.1))

  return (
    <g
      {...props}
      transform={`translate(${margin.left},0)`}
      ref={(ref) => d3.axisLeft(scale).ticks(null, '~s')(d3.select(ref))}
    >
      {label && (
        <>
          <text
            x={-margin.left + margin.space}
            y={margin.top - margin.space}
            fontWeight="bold"
            textAnchor="start"
            stroke="white"
            strokeWidth={4}
            strokeLinejoin="round"
          >
            {label}
          </text>
          <text
            x={-margin.left + margin.space}
            y={margin.top - margin.space}
            fontWeight="bold"
            textAnchor="start"
            fill="black"
          >
            {label}
          </text>
        </>
      )}
    </g>
  )
}

AxisY.propTypes = {
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
