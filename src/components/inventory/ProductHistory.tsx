import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useMovements } from '@/hooks/useMovements'
import { useTheme } from '@/hooks/useTheme'
import { ArrowUpCircle, ArrowDownCircle, RotateCcw, Package } from 'lucide-react'
import type { Product } from '@/types/product'
import { TOOL_STATUS_LABELS } from '@/data/mock'

type ProductHistoryProps = Readonly<{
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}>

const movementLabels = {
  entry: 'Entrada',
  exit: 'Salida',
  return: 'Devolución',
}

const movementIcons = {
  entry: ArrowDownCircle,
  exit: ArrowUpCircle,
  return: RotateCcw,
}

const movementColors = {
  entry: 'text-success',
  exit: 'text-warning',
  return: 'text-primary',
}

export function ProductHistory({ product, open, onOpenChange }: ProductHistoryProps) {
  const { getProductMovements } = useMovements()
  const { theme } = useTheme()
  
  const history = getProductMovements(product.id)
  
  const textStyles = {
    dark: { primary: '#E5E7EB', secondary: '#9CA3AF', muted: '#6B7280' },
    light: { primary: '#D1D5DB', secondary: '#9CA3AF', muted: '#6B7280' },
  }
  const s = textStyles[theme]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Historial de {product.name}</DialogTitle>
          <DialogDescription>
            {product.type === 'tool' ? `Estado: ${TOOL_STATUS_LABELS[product.status || 'available']}` : `Cantidad: ${product.quantity}`}
          </DialogDescription>
        </DialogHeader>

        {history.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 mx-auto mb-3" style={{ color: s.muted, opacity: 0.5 }} />
            <p style={{ color: s.secondary }}>No hay movimientos registrados</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((movement) => {
              const Icon = movementIcons[movement.type]
              return (
                <div
                  key={movement.id}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className={movementColors[movement.type]}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium" style={{ color: s.primary }}>
                        {movementLabels[movement.type]}
                      </span>
                      <span className="text-sm" style={{ color: s.muted }}>
                        {new Date(movement.date).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {movement.quantity > 0 && (
                      <span className="text-sm" style={{ color: s.secondary }}>
                        Cantidad: {movement.quantity}
                      </span>
                    )}
                    {movement.notes && (
                      <p className="text-sm mt-1" style={{ color: s.muted }}>
                        {movement.notes}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}