import { useState } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './components/inventory/Dashboard'
import { ProductList } from './components/inventory/ProductList'
import { ToolForm } from './components/inventory/ToolForm'
import { MaterialForm } from './components/inventory/MaterialForm'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'products' && <ProductList />}
      {currentView === 'add-tool' && <ToolForm />}
      {currentView === 'add-material' && <MaterialForm />}
    </Layout>
  )
}

export default App