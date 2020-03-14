import { makeStyles } from '@material-ui/core/styles'
import { expect } from 'chai'
import React from 'react'

import { render } from '../../utils-test'

import ThemeProvider from './ThemeProvider'

describe('Components / ThemeProvider', () => {
  it('works', () => {
    let mode = null

    const useStyles = makeStyles((theme) => {
      expect(theme).to.have.nested.property('palette.type', mode)
      return {}
    })

    function Test() {
      useStyles()
      return null
    }

    mode = 'light'
    render(
      <ThemeProvider isDark={false}>
        <Test />
      </ThemeProvider>,
    )

    mode = 'dark'
    render(
      <ThemeProvider isDark>
        <Test />
      </ThemeProvider>,
    )
  })
})
