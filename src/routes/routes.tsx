import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
)

export default Routes
