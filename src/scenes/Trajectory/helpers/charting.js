import { useMemo } from 'react'
import * as d3 from 'd3'

export default function useProcessor(data) {
  return useMemo(() => {
    if (!data) return {}

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

    const minX = d3.min(Object.values(data).map((data) => d3.min(data, getX)))
    const maxX = d3.max(Object.values(data).map((data) => d3.max(data, getX)))
    const minY = d3.min(Object.values(data).map((data) => d3.min(data, getY)))
    const maxY = d3.max(Object.values(data).map((data) => d3.max(data, getY)))

    const xScale = d3.scaleLog()
      .domain([ Math.max(1, minX), maxX ])
      .range([ margin.left, width - margin.right ])

    const yScale = d3.scaleLog()
      .domain([ Math.max(1, minY), maxY ])
      .range([ height - margin.bottom, margin.top ])

    const makeLine = d3.line()
      .curve(d3.curveCatmullRom)
      .x((point) => xScale(getX(point)))
      .y((point) => yScale(getY(point)))

    const makePoint = (point) => ({
      cx: xScale(getX(point)),
      cy: yScale(getY(point)),
    })

    const makeTransform = (point) => `translate(${xScale(getX(point))},${yScale(getY(point))})`

    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeCategory10)

    const master = data._

    return {
      width,
      height,
      margin,
      xScale,
      yScale,
      makeLine,
      makePoint,
      makeTransform,
      color,
      master,
    }
  }, [ data ])
}
