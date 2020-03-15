import { expect } from 'chai'
import React from 'react'

import { render } from '../../utils-test'

import Icon from './Icon'

describe('Components / Icon', () => {
  it('works with title', () => {
    const { getByTitle } = render(<Icon name="acorn" title="Acorn!" />)

    expect(getByTitle('Acorn!')).to.have.class('fa-acorn')
  })

  it('works without title', () => {
    render(<Icon name="acorn" />)
  })
})
