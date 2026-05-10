import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useInventory } from '@/hooks/useInventory'
import { Package, Wrench, AlertTriangle, TrendingUp, DollarSign, Boxes } from 'lucide-react'

export function Dashboard() {
  const { products, getTools, getMaterials } = useInventory()

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
        <h2 className="text-3xl font-bold text-text-primary tracking-tight">Dashboard</h2>
        <p className="text-text-secondary mt-1">Resumen de tu inventario</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          label="Total Productos"
          value={products.length}
          color="primary"
        />
        <StatCard
          icon={Wrench}
          label="Herramientas Disponibles"
          value={availableTools}
          color="success"
        />
        <StatCard
          icon={TrendingUp}
          label="En Uso"
          value={inUseTools}
          color="warning"
        />
        <StatCard
          icon={AlertTriangle}
          label="Stock Bajo"
          value={lowStockMaterials.length}
          color="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Estado de Herramientas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <ProgressBar
                label="Disponibles"
                value={availableTools}
                total={tools.length}
                color="bg-success"
              />
              <ProgressBar
                label="En Uso"
                value={inUseTools}
                total={tools.length}
                color="bg-warning"
              />
              <ProgressBar
                label="Dañadas"
                value={damagedTools}
                total={tools.length}
                color="bg-danger"
              />
              {tools.length === 0 && (
                <p className="text-text-muted text-sm text-center py-4">
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
              <MetricBox
                icon={Boxes}
                label="Tipos"
                value={materials.length}
              />
              <MetricBox
                icon={Package}
                label="Unidades"
                value={totalUnits}
              />
              <MetricBox
                icon={DollarSign}
                label="Valor"
                value={`$${totalValue.toFixed(0)}`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: typeof Package
  label: string
  value: number
  color: 'primary' | 'success' | 'warning' | 'danger'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/30',
    success: 'bg-success/10 text-success border-success/30',
    warning: 'bg-warning/10 text-warning border-warning/30',
    danger: 'bg-danger/10 text-danger border-danger/30',
  }

  return (
    <Card className="glass-card hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl border ${colorClasses[color]} bg-opacity-20`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-3xl font-bold text-text-primary">{value}</p>
            <p className="text-sm text-text-secondary">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProgressBar({ 
  label, 
  value, 
  total, 
  color 
}: { 
  label: string
  value: number
  total: number
  color: string
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">{label}</span>
        <span className="text-text-primary font-medium">{value} / {total}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function MetricBox({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: typeof Boxes
  label: string
  value: string | number
}) {
  return (
    <div className="text-center p-4 rounded-xl bg-white/5 border border-border/50">
      <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
      <p className="text-xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-muted">{label}</p>
    </div>
  )
}