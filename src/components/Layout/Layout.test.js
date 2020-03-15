import { expect } from 'chai'
import React from 'react'

import { renderWithRouter } from '../../utils-test'

import Layout from './Layout'

describe('Components / Layout', () => {
  it('works with known route', () => {
    const { getByText } = renderWithRouter(<Layout>Layout</Layout>, [ '/' ])
    expect(getByText('Info').parentNode).to.have.class('Mui-selected')
  })

  it('works without known route', () => {
    const { getByText } = renderWithRouter(<Layout>Layout</Layout>, [ '/foobar' ])
    expect(getByText('Info').parentNode).to.not.have.class('Mui-selected')
  })
})
