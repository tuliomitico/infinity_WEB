import React from 'react'
import { Router } from 'react-router-dom'

import { AuthProvider, history } from './hooks/auth'
import Routes from './routes/routes'

const App: React.FC = () => (
  <AuthProvider>
    <Router history={history}>
      <Routes />
    </Router>
  </AuthProvider>
)

export default App
