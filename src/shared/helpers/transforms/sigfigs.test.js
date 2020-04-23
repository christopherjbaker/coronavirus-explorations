import { expect } from 'chai'

import toSigFigs from './sigfigs'

describe('Helpers / Transforms / toSigFigs', () => {
  it('works with numbers', () => {
    expect(toSigFigs(5000)).to.equal('5000')
    expect(toSigFigs(500)).to.equal('500')
    expect(toSigFigs(50)).to.equal('50.0')
    expect(toSigFigs(5)).to.equal('5.00')
    expect(toSigFigs(0.5)).to.equal('0.500')
    expect(toSigFigs(0.05)).to.equal('0.0500')
    expect(toSigFigs(0.005)).to.equal('0.00500')
    expect(toSigFigs(0.0005)).to.equal('0.000500')
    expect(toSigFigs(0.00005)).to.equal('0.0000500')
    expect(toSigFigs(0.000005)).to.equal('0.00000500')
    expect(toSigFigs(0.0000005)).to.equal('0.000000500')
    expect(toSigFigs(0.00000005)).to.equal('0.0000000500')
    expect(toSigFigs(0.000000005)).to.equal('0')
  })
})
