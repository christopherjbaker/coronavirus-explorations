import { expect } from 'chai'
import React from 'react'

import { render } from '../../../utils-test'

import Page from './Page'

describe('Components / Page', () => {
  it('works', () => {
    const { getByText } = render(<Page title="Page Title">Hello</Page>)

    expect(getByText('Page Title')).to.match('h1')
  })
})
