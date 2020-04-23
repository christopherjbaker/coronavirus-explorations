import { expect } from 'chai'

import toPercent from './percent'

describe('Helpers / Transforms / toPercent', () => {
  it('works with numbers', () => {
    expect(toPercent(0.5)).to.equal('50%')
  })

  it('works with strings', () => {
    expect(toPercent('50')).to.equal('50%')
  })
})
