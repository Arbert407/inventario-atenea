import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useInventory } from '@/hooks/useInventory'
import { useTheme } from '@/hooks/useTheme'
import { Package, Wrench, AlertTriangle, TrendingUp, DollarSign, Boxes } from 'lucide-react'

export function Dashboard() {
  const { products, getTools, getMaterials } = useInventory()
  const { theme } = useTheme()

  const tools = getTools()
  const materials = getMaterials()

  const availableTools = tools.filter(t => t.status === 'available').length
  const inUseTools = tools.filter(t => t.status === 'in_use').length
  const damagedTools = tools.filter(t => t.status === 'damaged').length

  const lowStockMaterials = materials.filter(
    m => m.quantity !== undefined && m.minStock !== undefined && m.quantity < m.minStock
  )

  const totalValue = materials.reduce((sum, m) => {
    if (m.salePrice && m.quantity) {
      return sum + (m.salePrice * m.quantity)
    }
    return sum
  }, 0)

  const totalUnits = materials.reduce((sum, m) => sum + (m.quantity || 0), 0)

  return (
    <div className="space-y-8">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: '#E5E7EB' }}>
          Dashboard
        </h2>
        <p className="mt-1" style={{ color: '#9CA3AF' }}>Resumen de tu inventario</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Package} label="Total Productos" value={products.length} color="primary" theme={theme} />
        <StatCard icon={Wrench} label="Herramientas Disponibles" value={availableTools} color="success" theme={theme} />
        <StatCard icon={TrendingUp} label="En Uso" value={inUseTools} color="warning" theme={theme} />
        <StatCard icon={AlertTriangle} label="Stock Bajo" value={lowStockMaterials.length} color="danger" theme={theme} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Estado de Herramientas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <ProgressBar label="Disponibles" value={availableTools} total={tools.length} color="bg-success" theme={theme} />
              <ProgressBar label="En Uso" value={inUseTools} total={tools.length} color="bg-warning" theme={theme} />
              <ProgressBar label="Dañadas" value={damagedTools} total={tools.length} color="bg-danger" theme={theme} />
              {tools.length === 0 && (
                <p className="text-sm text-center py-4" style={{ color: '#6B7280' }}>
                  Sin herramientas registradas
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Resumen de Materiales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <MetricBox icon={Boxes} label="Tipos" value={materials.length} theme={theme} />
              <MetricBox icon={Package} label="Unidades" value={totalUnits} theme={theme} />
              <MetricBox icon={DollarSign} label="Valor" value={`$${totalValue.toFixed(0)}`} theme={theme} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

type StatCardProps = Readonly<{ 
  icon: typeof Package
  label: string
  value: number
  color: 'primary' | 'success' | 'warning' | 'danger'
  theme: 'dark' | 'light'
}>

function StatCard({ icon: Icon, label, value, color, theme }: StatCardProps) {
  const colorClasses = {
    dark: {
      primary: 'bg-primary/10 text-primary border-primary/30',
      success: 'bg-success/10 text-success border-success/30',
      warning: 'bg-warning/10 text-warning border-warning/30',
      danger: 'bg-danger/10 text-danger border-danger/30',
    },
    light: {
      primary: 'bg-orange-100 text-orange-600 border-orange-300',
      success: 'bg-green-100 text-green-600 border-green-300',
      warning: 'bg-yellow-100 text-yellow-600 border-yellow-300',
      danger: 'bg-red-100 text-red-600 border-red-300',
    },
  }
  const c = colorClasses[theme]

  return (
    <Card className="glass-card hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl border ${c[color]} bg-opacity-20`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-bold" style={{ color: '#E5E7EB' }}>{value}</p>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type ProgressBarProps = Readonly<{ 
  label: string
  value: number
  total: number
  color: string
  theme: 'dark' | 'light'
}>

function ProgressBar({ label, value, total, color, theme }: ProgressBarProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: '#9CA3AF' }}>{label}</span>
        <span className="font-medium" style={{ color: '#E5E7EB' }}>{value} / {total}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

type MetricBoxProps = Readonly<{ 
  icon: typeof Boxes
  label: string
  value: string | number
  theme: 'dark' | 'light'
}>

function MetricBox({ icon: Icon, label, value, theme }: MetricBoxProps) {
  return (
    <div className="text-center p-4 rounded-xl border" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.05)' }}>
      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: theme === 'dark' ? '#4CC9F0' : '#F97316' }} />
      <p className="text-xl font-bold" style={{ color: '#E5E7EB' }}>{value}</p>
      <p className="text-xs" style={{ color: '#6B7280' }}>{label}</p>
    </div>
  )
}