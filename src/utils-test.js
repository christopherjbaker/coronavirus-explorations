/* istanbul ignore file */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import chai from 'chai'
import chaiDom from 'chai-dom'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { cleanup, render as _render } from '@testing-library/react'

import theme from './theme'

export * from '@testing-library/react'

chai.use(chaiDom)
afterEach(cleanup)

export function render(node) {
  return _render(<ThemeProvider theme={theme}>{node}</ThemeProvider>)
}

export function renderWithRouter(node, initialEntries) {
  return render(<MemoryRouter initialEntries={initialEntries}>{node}</MemoryRouter>)
}
