import { expect } from 'chai'

import toNumber from './number'

describe('Helpers / Transforms / toNumber', () => {
  it('works with numbers', () => {
    expect(toNumber(1000)).to.equal('1,000')
  })

  it('works with strings', () => {
    expect(toNumber('1000')).to.equal('1,000')
  })

  it('works with decimal places', () => {
    expect(toNumber(1000.5, 1)).to.equal('1,000.5')
  })

  it('works with function places', () => {
    function getDecimalPlaces() {
      return 3
    }

    expect(toNumber(1000.5, getDecimalPlaces)).to.equal('1,000.500')
  })
})
