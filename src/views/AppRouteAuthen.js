import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react'

import NotFoundError404 from '../pages/NotFoundError404'
import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'
import Loading from '../components/Loading'
import ImplicitCallback from '../components/ImplicitCallback'

export default function AppRouteAuthen() {
  const { authState } = useOktaAuth()

  if (authState.isPending) {
    return <Loading />
  }

  return (
    <Router>
      <Switch>
        <Route path="/implicit/callback" component={ImplicitCallback} />
        {!authState.isAuthenticated && <Route exact path="/" component={LandingPage} />}
        {authState.isAuthenticated && <Route path="/" component={Home} />}
        <Route component={NotFoundError404} />
      </Switch>
    </Router>
  )
}
