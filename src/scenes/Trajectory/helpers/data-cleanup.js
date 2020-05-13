import _ from 'lodash/fp'

const LIMIT = 7

export default function cleanupData(data, groupBy, filter, pick) {
  return _.flow([
    _.filter((row) => row.county !== 'Unknown'),
    _.isFunction(filter) ? _.filter(filter) : _.identity,
    _.groupBy(groupBy),
    _.isArray(pick) ? _.pick(pick) : _.identity,
    _.isFunction(pick) ? _.pickBy(pick) : _.identity,
    _.mapValues(makeDaily),
    _.mapValues(processData),
    _.set('_', _.flow([
      _.isFunction(filter) ? _.filter(filter) : _.identity,
      _.groupBy('date'),
      _.values,
      _.map((items) => ({
        date: items[0].date,
        cases: _.flow([
          _.map(_.get('cases')),
          _.sum,
        ])(items),
        deaths: _.flow([
          _.map(_.get('deaths')),
          _.sum,
        ])(items),
      })),
      // _.filter((item) => item.cases > 20),
      processData,
    ])(data)),
  ])(data)
}

const DAY = 24 * 60 * 60 * 1000
function makeDaily(data) {
  return _.reduce((data, item) => {
    if (!data.length) {
      return [ item ]
    }

    const last = _.last(data)
    const start = last.date.valueOf()
    const end = item.date.valueOf()

    if (end - start === DAY) {
      return _.concat(data, item)
    }

    return _.flow([
      () => _.rangeStep(DAY, start + DAY, end),
      _.map((date) => ({
        ...last,
        date: new Date(date),
      })),
      _.concat(_, item),
      _.concat(data),
    ])()
  }, [], data)
}

function processData(data) {
  const firstIndex = LIMIT === 7 ? _.findIndex(({ date }) => date.getDay() === 0, data) : 0
  const lastIndex = firstIndex + LIMIT * Math.floor((data.length - firstIndex) / LIMIT)

  let lastCases = null

  const counts = _.flow([
    _.slice(firstIndex, lastIndex + 1),
    _.filter(isNth(LIMIT)),
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
