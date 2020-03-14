import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ThemeProvider from './components/ThemeProvider/ThemeProvider'
import Layout from './components/Layout/Layout'

import Landing from './scenes/Landing/Landing'
import NotFound from './scenes/NotFound/NotFound'

ReactDOM.render((
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ThemeProvider isDark>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
), document.getElementById('root'))
