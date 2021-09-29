import React from 'react'
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom'
import Search from '../components/Search'
import { useAuth } from '../hooks/auth'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Stores from '../pages/Stores'
import Create from '../pages/Stores/Create'
import Delete from '../pages/Stores/Delete'
import Edit from '../pages/Stores/Edit'
import Store from '../pages/Stores/Store'
import UserEdit from '../pages/User/Edit'

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean
}

const CustomRoutes: React.FC<CustomRouteProps> = ({ isPrivate, ...rest }) => {
  const { loading, authenticated } = useAuth()

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (isPrivate && !authenticated) {
    return <Redirect exact to="/" />
  }

  return <Route {...rest} />
}

const Routes: React.FC = () => (
  <Switch>
    <CustomRoutes exact path="/" component={Stores} />
    <CustomRoutes exact path="/store/:slug" component={Store} />
    <CustomRoutes isPrivate exact path="/store" component={Create} />
    <CustomRoutes isPrivate exact path="/store/delete/:id" component={Delete} />
    <CustomRoutes isPrivate exact path="/store/edit/:id" component={Edit} />
    <CustomRoutes path="/login" component={Login} />
    <CustomRoutes path="/register" component={Register} />
    <CustomRoutes path="/search" component={Search} />
    <CustomRoutes path="/edit" component={UserEdit} />
  </Switch>
)

export default Routes
