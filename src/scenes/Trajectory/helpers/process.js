import _ from 'lodash/fp'

import processIntervals from './process-daily'

const DAY = 24 * 60 * 60 * 1000

export default function processData(data, groupBy, filter, pick) {
  const process = _.flow([
    makeDaily,
    makeRolling(7 * 3),
    processIntervals,
    (data) => {
      const index = data.findIndex((point) => point.total >= 1000)
      return _.slice(index, data.length, data)
    },
  ])

  return _.flow([
    _.filter((row) => row.county !== 'Unknown'),
    _.filter(filter || _.identity),
    _.groupBy(groupBy),
    _.isArray(pick) ? _.pick(pick) : _.identity,
    _.isFunction(pick) ? _.pickBy(pick) : _.identity,
    _.mapValues(process),
    _.set('_', _.flow([
      _.filter(filter || _.identity),
      _.groupBy('date'),
      _.values,
      _.map((items) => ({
        date: items[0].date,
        cases: _.sumBy('cases', items),
        deaths: _.sumBy('deaths', items),
      })),
      process,
    ])(data)),
  ])(data)
}

function makeDaily(data) {
  return _.reduce((data, item) => {
    if (!data.length) {
      return [item]
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

function makeRolling(days) {
  return (data) => _.reduce(({ data, history }, item) => {
    history = history.concat(item).slice(-days)

    if (history.length < days) {
      return { data, history }
    }

    data = data.concat({
      date: item.date,
      cases: _.sumBy('cases', history) / days,
      deaths: _.sumBy('deaths', history) / days,
    })

    return { data, history }
  }, { data: [], history: [] }, data).data
}
