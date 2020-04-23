import { expect } from 'chai'
import React from 'react'

import { renderWithRouter } from '../../utils-test'

import Layout from './Layout'

describe('Components / Layout', () => {
  const tabs = [
    { label: 'Tab Title', to: '/', exact: true },
  ]

  it('works with known route', () => {
    const { getByText } = renderWithRouter((
      <Layout title="Site Title" tabs={tabs}>Layout</Layout>
    ), [ '/' ])
    expect(getByText('Tab Title').parentNode).to.have.class('Mui-selected')
  })

  it('works without known route', () => {
    const { getByText } = renderWithRouter((
      <Layout title="Title" tabs={tabs}>Layout</Layout>
    ), [ '/foobar' ])
    expect(getByText('Tab Title').parentNode).to.not.have.class('Mui-selected')
  })
})
