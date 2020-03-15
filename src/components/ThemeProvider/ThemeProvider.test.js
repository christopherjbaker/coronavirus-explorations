import React from 'react'

import { render } from '../../utils-test'

import ThemeProvider from './ThemeProvider'

describe('Components / ThemeProvider', () => {
  it('works', () => {
    render(<ThemeProvider>ThemeProvider</ThemeProvider>)
  })
})
