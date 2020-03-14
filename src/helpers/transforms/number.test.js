import { expect } from 'chai'

import toNumber from './number'

describe('Helpers / number', () => {
  it('works', () => {
    expect(toNumber(1000)).to.equal('1,000')
  })
})
