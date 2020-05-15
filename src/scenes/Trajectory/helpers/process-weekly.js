import _ from 'lodash/fp'

const DAYS = 7

export default function processDataWeekly(data) {
  const firstIndex = DAYS === 7 ? _.findIndex(({ date }) => date.getDay() === 6, data) : 0
  const lastIndex = firstIndex + DAYS * Math.floor((data.length - firstIndex - 1) / DAYS)

  let lastCases = null
  const counts = _.flow([
    _.slice(firstIndex, lastIndex + 1),
    _.filter(isNth(DAYS)),
    _.map(({ date, cases: total }) => {
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
    }),
  ])(data)

  const extrapolated = lastIndex < data.length - 1 && (() => {
    const previous = _.last(counts)
    const point = _.last(data)

    const days = data.length - lastIndex - 1
    const correction = DAYS / days
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
        date: new Date(previous.date.valueOf() + DAYS * 24 * 60 * 60 * 1000),
        total: previous.total + projectedGrowth,
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

function isNth(n) {
  let i = 0
  return () => i++ % n === 0
}
