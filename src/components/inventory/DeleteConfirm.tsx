import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import type { Product } from '@/types/product'

type DeleteConfirmProps = Readonly<{
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}>

export function DeleteConfirm({ product, open, onOpenChange, onConfirm }: DeleteConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-danger/10">
              <AlertTriangle className="w-5 h-5 text-danger" />
            </div>
            <DialogTitle>Eliminar Producto</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar <strong>"{product.name}"</strong>? 
          Esta acción no se puede deshacer.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}