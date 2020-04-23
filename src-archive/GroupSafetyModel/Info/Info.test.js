import React from 'react'

import { renderWithRouter } from '../../utils-test'

import Info from './Info'

describe('Scenes / Info', () => {
  it('works', () => {
    const { getByText } = renderWithRouter(<Info />)

    getByText('Model Information')
  })
})
