import { useMemo } from 'react'
import * as d3 from 'd3'

export default function useProcessor(data) {
  return useMemo(() => {
    if (!data) return {}

    const master = data._

    const width = 864
    const height = Math.round(width * ((Math.sqrt(5) - 1) / 2))
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40,
      space: 4,
    }

    const getX = (point) => Math.max(point.total, 1)
    const getY = (point) => Math.max(point.growth, 1)

    const xScale = d3.scaleLog()
      .domain([ 1, d3.max(master, getX) ])
      .range([ margin.left, width - margin.right ])

    const yScale = d3.scaleLog()
      .domain([ 1, d3.max(master, getY) ])
      .range([ height - margin.bottom, margin.top ])

    const makeLine = d3.line()
      .curve(d3.curveCatmullRom)
      .x((point) => xScale(getX(point)))
      .y((point) => yScale(getY(point)))

    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeCategory10)

    return {
      width,
      height,
      margin,
      xScale,
      yScale,
      makeLine,
      color,
      master,
    }
  }, [ data ])
}
