import { useState } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './components/inventory/Dashboard'
import { ProductList } from './components/inventory/ProductList'
import { ToolForm } from './components/inventory/ToolForm'
import { MaterialForm } from './components/inventory/MaterialForm'
import { ThemeProvider } from './hooks/useTheme'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <ThemeProvider theme={theme} onThemeChange={setTheme}>
      <Layout currentView={currentView} onNavigate={setCurrentView} theme={theme} onThemeChange={setTheme}>
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'products' && <ProductList filterType="all" />}
        {currentView === 'tools' && <ProductList filterType="tool" />}
        {currentView === 'materials' && <ProductList filterType="material" />}
        {currentView === 'add-tool' && <ToolForm />}
        {currentView === 'add-material' && <MaterialForm />}
      </Layout>
    </ThemeProvider>
  )
}

export default App