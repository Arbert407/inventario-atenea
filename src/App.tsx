import { useState } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './components/inventory/Dashboard'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && <Dashboard />}
    </Layout>
  )
}

export default App