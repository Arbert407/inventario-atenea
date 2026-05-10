import { useState, type FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useInventory } from '@/hooks/useInventory'
import { useMovements } from '@/hooks/useMovements'
import { useTheme } from '@/hooks/useTheme'
import { ArrowDownCircle, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Product } from '@/types/product'

type RegisterMovementProps = Readonly<{
  product: Product
  type: 'entry' | 'exit' | 'return'
  open: boolean
  onOpenChange: (open: boolean) => void
}>

export function RegisterMovement({ product, type, open, onOpenChange }: RegisterMovementProps) {
  const { updateProduct } = useInventory()
  const { addMovement } = useMovements()
  const { theme } = useTheme()
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState('')

  const isEntry = type === 'entry'
  const isReturn = type === 'return'

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    const qty = parseInt(quantity, 10)
    if (!quantity || qty <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0'
    }
    if (isEntry && product.maxStock !== undefined && qty > (product.maxStock - (product.quantity || 0))) {
      newErrors.quantity = 'Supera el stock máximo'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccess('')

    if (!validate()) return

    const qty = parseInt(quantity, 10)
    const newQuantity = isEntry || isReturn
      ? (product.quantity || 0) + qty
      : Math.max(0, (product.quantity || 0) - qty)

    updateProduct(product.id, { quantity: newQuantity })
    addMovement(product.id, type, qty, notes || undefined)

    setSuccess(isEntry ? 'Entrada registrada correctamente' : isReturn ? 'Devolución registrada correctamente' : 'Salida registrada correctamente')
    
    setTimeout(() => {
      onOpenChange(false)
      setQuantity('')
      setNotes('')
      setErrors({})
      setSuccess('')
    }, 1500)
  }

  const textStyles = {
    dark: { primary: '#E5E7EB', secondary: '#9CA3AF', muted: '#6B7280' },
    light: { primary: '#D1D5DB', secondary: '#9CA3AF', muted: '#6B7280' },
  }
  const s = textStyles[theme]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEntry ? 'Registrar Entrada' : isReturn ? 'Registrar Devolución' : 'Registrar Salida'}
          </DialogTitle>
          <DialogDescription>
            {product.name} - Stock actual: {product.quantity || 0}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/20 text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">{success}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: s.primary }}>
              Cantidad <span className="text-danger">*</span>
            </label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={isEntry || isReturn ? "Cantidad a agregar" : "Cantidad a retirar"}
            />
            {errors.quantity && (
              <div className="flex items-center gap-1 text-danger text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.quantity}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: s.primary }}>Notas (opcional)</label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Compra de reposición"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEntry ? 'Registrar Entrada' : isReturn ? 'Registrar Devolución' : 'Registrar Salida'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}