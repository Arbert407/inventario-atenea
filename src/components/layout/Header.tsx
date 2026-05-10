import { useState } from 'react'
import { Package, Bell, Menu, X, Sun, Moon } from 'lucide-react'

type HeaderProps = Readonly<{
  currentView: string
  onNavigate: (view: string) => void
  theme: 'dark' | 'light'
  onThemeChange: (theme: 'dark' | 'light') => void
}>

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'products', label: 'Productos' },
  { id: 'add-tool', label: 'Agregar Herramienta' },
  { id: 'add-material', label: 'Agregar Material' },
  { id: 'tools', label: 'Herramientas' },
  { id: 'materials', label: 'Materiales' },
  { id: 'movements', label: 'Movimientos' },
  { id: 'search', label: 'Buscar' },
  { id: 'categories', label: 'Categorías' },
  { id: 'reports', label: 'Reportes' },
]

const themeStyles = {
  dark: {
    header: 'bg-[#283548]',
    navActive: 'bg-[#4CC9F0] text-[#0F172A]',
    navInactive: 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151] hover:text-[#E5E7EB]',
    textPrimary: 'text-[#E5E7EB]',
    textMuted: 'text-[#6B7280]',
    border: 'border-[rgba(255,255,255,0.12)]',
    hoverBg: 'hover:bg-[rgba(255,255,255,0.08)]',
    icon: 'text-[#6B7280]',
  },
  light: {
    header: 'bg-[#3D352C]',
    navActive: 'bg-[#F97316] text-white',
    navInactive: 'bg-[#2A2520] text-[#9CA3AF] hover:bg-[#4A4035] hover:text-[#E5E7EB]',
    textPrimary: 'text-[#E5E7EB]',
    textMuted: 'text-[#6B7280]',
    border: 'border-[rgba(255,255,255,0.12)]',
    hoverBg: 'hover:bg-[rgba(255,255,255,0.08)]',
    icon: 'text-[#9CA3AF]',
  },
}

export function Header({ currentView, onNavigate, theme, onThemeChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const styles = themeStyles[theme]

  const handleNavigate = (view: string) => {
    onNavigate(view)
    setMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    onThemeChange(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className={`h-14 border-b ${styles.border} flex items-center px-4 md:px-6 ${styles.header}`}>
      <div className="flex items-center gap-2 md:mr-10 pl-2">
        <Package className={`w-5 h-5 ${theme === 'dark' ? 'text-[#4CC9F0]' : 'text-[#F97316]'}`} />
        <span className={`text-base font-semibold ${styles.textPrimary}`}>Inventario Atenea</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-1 flex-1">
        {menuItems.map((item) => {
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? styles.navActive
                  : styles.navInactive
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
      
      <div className="flex items-center gap-2 mr-2 ml-auto">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${styles.hoverBg} transition-colors`}
        >
          {theme === 'dark' ? (
            <Sun className={`w-4 h-4 ${styles.icon}`} />
          ) : (
            <Moon className={`w-4 h-4 ${styles.icon}`} />
          )}
        </button>
        
        <button className={`hidden md:block p-2 rounded-lg ${styles.hoverBg} transition-colors relative`}>
          <Bell className={`w-4 h-4 ${styles.icon}`} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
        </button>
        
        <button 
          className={`md:hidden p-2 rounded-lg ${styles.hoverBg} transition-colors`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={`w-5 h-5 ${styles.textPrimary}`} />
          ) : (
            <Menu className={`w-5 h-5 ${styles.textPrimary}`} />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={`absolute top-14 left-0 right-0 ${styles.header} border-b ${styles.border} md:hidden z-50`}>
          <nav className="flex flex-col p-4 gap-2">
            {menuItems.map((item) => {
              const isActive = currentView === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                    isActive
                      ? styles.navActive
                      : styles.navInactive
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
            <button className={`p-3 rounded-lg ${styles.hoverBg} transition-colors relative text-left ${styles.textMuted}`}>
              <Bell className="w-4 h-4 inline mr-2" />
              <span className="text-sm">Notificaciones</span>
              <span className="absolute right-4 top-3.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}