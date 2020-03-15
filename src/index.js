import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ThemeProvider from './components/ThemeProvider/ThemeProvider'
import Layout from './components/Layout/Layout'

import Info from './scenes/Info/Info'
import NotFound from './scenes/NotFound/NotFound'
import Recommendations from './scenes/Recommendations/Recommendations'

ReactDOM.render((
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ThemeProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Info />
          </Route>
          <Route path="/recommendations" exact>
            <Recommendations />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
), document.getElementById('root'))
