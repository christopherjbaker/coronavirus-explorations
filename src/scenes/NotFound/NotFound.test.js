import React from 'react'

import { renderWithRouter } from '../../utils-test'

import NotFound from './NotFound'

describe('Scenes / NotFound', () => {
  it('works', () => {
    const { getByText } = renderWithRouter(<NotFound />)

    getByText('Oops! Page Not Found')
  })
})
