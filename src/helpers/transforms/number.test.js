import { expect } from 'chai'

import toNumber from './number'

describe('Helpers / Transforms / toNumber', () => {
  it('works with numbers', () => {
    expect(toNumber(1000)).to.equal('1,000')
  })

  it('works with strings', () => {
    expect(toNumber('1000')).to.equal('1,000')
  })
})
