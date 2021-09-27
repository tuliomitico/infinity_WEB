import React from 'react'
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Store from '../pages/Stores'

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean
}

const CustomRoutes: React.FC<CustomRouteProps> = ({ isPrivate, ...rest }) => {
  const { loading, authenticated } = useAuth()

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (isPrivate && !authenticated) {
    return <Redirect to="/" />
  }

  return <Route {...rest} />
}

const Routes: React.FC = () => (
  <Switch>
    <CustomRoutes exact path="/" component={Store} />
    <CustomRoutes exact path="/login" component={Login} />
    <CustomRoutes isPrivate={false} path="/register" component={Register} />
  </Switch>
)

export default Routes
