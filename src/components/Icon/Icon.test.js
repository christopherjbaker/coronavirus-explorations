import { expect } from 'chai'
import React from 'react'

import { render } from '../../utils-test'

import Icon from './Icon'

describe('Components / Icon', () => {
  it('works', () => {
    const { getByTitle } = render(<Icon name="acorn" title="Acorn!" />)

    expect(getByTitle('Acorn!')).to.have.class('fa-acorn')
  })
})
