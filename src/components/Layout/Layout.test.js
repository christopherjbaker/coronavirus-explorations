import React from 'react'

import { renderWithRouter } from '../../utils-test'

import Layout from './Layout'

describe('Components / Layout', () => {
  it('works', () => {
    renderWithRouter(<Layout>Layout</Layout>)
  })
})
