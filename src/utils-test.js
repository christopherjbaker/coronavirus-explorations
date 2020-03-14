/* istanbul ignore file */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import chai from 'chai'
import chaiDom from 'chai-dom'
import { cleanup, render as _render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import ThemeProvider from './components/ThemeProvider/ThemeProvider'

export * from '@testing-library/react'

chai.use(chaiDom)
afterEach(cleanup)

export function render(node) {
  return _render(<ThemeProvider isDark>{node}</ThemeProvider>)
}

export function renderWithRouter(node, initialEntries) {
  return render(<MemoryRouter initialEntries={initialEntries}>{node}</MemoryRouter>)
}
