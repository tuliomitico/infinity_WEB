import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from './hooks/auth'
import Routes from './routes/routes'

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes />
    </Router>
  </AuthProvider>
)

export default App
