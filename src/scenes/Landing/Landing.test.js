import React from 'react'

import { renderWithRouter } from '../../utils-test'

import Landing from './Landing'

describe('Scenes / Landing', () => {
  it('works', () => {
    const { getByText } = renderWithRouter(<Landing />)

    getByText('Coronavirus Work From Home Model')
  })
})
