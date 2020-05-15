import _ from 'lodash/fp'

const DAYS = 7
const DAY = 24 * 60 * 60 * 1000

export default function processDataDaily(data) {
  let lastCases = null
  const counts = _.map(({ date, cases: total }) => {
    if (lastCases === null) {
      lastCases = total
      return null
    }

    const growth = total - lastCases
    lastCases = total

    return {
      date,
      total,
      growth,
    }
  }, data)

  const extrapolated = (() => {
    const previous = _.nth(-2, counts)
    const point = _.nth(-1, counts)

    const growthRate = 1 + (point.growth - previous.growth) / previous.growth
    const projectedGrowth = (growthRate ** DAYS) * point.growth

    return [
      false && {
        date: new Date(point.date.valueOf() + DAYS * DAY),
        total: point.total + projectedGrowth,
        growth: projectedGrowth,
        type: 'extrapolated',
      },
    ]
  })()

  return _.flow([
    _.concat(_, extrapolated),
    _.compact,
    _.map(({ total, growth, ...rest }) => ({
      ...rest,
      total,
      growth,
      rate: growth / total,
    })),
  ])(counts)
}
