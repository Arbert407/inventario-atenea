import { useState } from 'react'
import { Package, Bell, Menu, X } from 'lucide-react'

type HeaderProps = Readonly<{
  currentView: string
  onNavigate: (view: string) => void
}>

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'products', label: 'Productos' },
  { id: 'tools', label: 'Herramientas' },
  { id: 'materials', label: 'Materiales' },
  { id: 'movements', label: 'Movimientos' },
  { id: 'search', label: 'Buscar' },
  { id: 'categories', label: 'Categorías' },
  { id: 'reports', label: 'Reportes' },
]

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (view: string) => {
    onNavigate(view)
    setMobileMenuOpen(false)
  }

  return (
    <header className="h-14 border-b border-[rgba(255,255,255,0.12)] flex items-center px-4 md:px-6 bg-[#283548]">
      <div className="flex items-center gap-2 md:mr-10 pl-2">
        <Package className="w-5 h-5 text-[#4CC9F0]" />
        <span className="text-base font-semibold text-[#E5E7EB]">Inventario Atenea</span>
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
                  ? 'bg-[#4CC9F0] text-[#0F172A]'
                  : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151] hover:text-[#E5E7EB]'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
      
      <div className="flex items-center gap-2 mr-2 ml-auto">
        <button className="hidden md:block p-2 rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors relative">
          <Bell className="w-4 h-4 text-[#6B7280]" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
        </button>
        
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-[#E5E7EB]" />
          ) : (
            <Menu className="w-5 h-5 text-[#E5E7EB]" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-[#283548] border-b border-[rgba(255,255,255,0.12)] md:hidden z-50">
          <nav className="flex flex-col p-4 gap-2">
            {menuItems.map((item) => {
              const isActive = currentView === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-[#4CC9F0] text-[#0F172A]'
                      : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151] hover:text-[#E5E7EB]'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
            <button className="p-3 rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors relative text-left text-[#6B7280]">
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