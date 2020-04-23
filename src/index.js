import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './theme'
import Layout from './components/Layout/Layout'

import Info from './scenes/Info/Info'
import NotFound from './scenes/NotFound/NotFound'

ReactDOM.render((
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ThemeProvider theme={theme}>
      <Layout
        title="Coronavirus Explorations"
        tabs={[
          { label: 'Info', to: '/', exact: true },
        ]}
      >
        <Switch>
          <Route path="/" exact>
            <Info />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
), document.getElementById('root'))
