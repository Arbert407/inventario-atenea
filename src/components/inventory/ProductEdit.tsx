import { useState, useEffect, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useInventory } from '@/hooks/useInventory'
import { DEFAULT_CATEGORIES, DEFAULT_LOCATIONS } from '@/data/mock'
import type { Product } from '@/types/product'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

type ProductEditProps = Readonly<{
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}>

export function ProductEdit({ product, open, onOpenChange }: ProductEditProps) {
  const { updateProduct } = useInventory()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('')
  const [quantity, setQuantity] = useState('')
  const [minStock, setMinStock] = useState('')
  const [maxStock, setMaxStock] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const isTool = product.type === 'tool'

  useEffect(() => {
    if (open && product) {
      setName(product.name)
      setDescription(product.description || '')
      setCategory(product.category)
      setLocation(product.location)
      setStatus(product.status || 'available')
      setQuantity(product.quantity?.toString() || '0')
      setMinStock(product.minStock?.toString() || '0')
      setMaxStock(product.maxStock?.toString() || '0')
      setPurchasePrice(product.purchasePrice?.toString() || '')
      setSalePrice(product.salePrice?.toString() || '')
      setErrors({})
      setSuccessMessage('')
    }
  }, [open, product])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'El nombre es requerido'
    if (!category) newErrors.category = 'La categoría es requerida'
    if (!location) newErrors.location = 'La ubicación es requerida'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccessMessage('')

    if (!validate()) return

    const updates: Partial<Product> = {
      name: name.trim(),
      description: description.trim(),
      category,
      location,
    }

    if (isTool) {
      updates.status = status as Product['status']
    } else {
      updates.quantity = quantity ? parseInt(quantity, 10) : 0
      updates.minStock = minStock ? parseInt(minStock, 10) : 0
      updates.maxStock = maxStock ? parseInt(maxStock, 10) : 0
      updates.purchasePrice = purchasePrice ? parseFloat(purchasePrice) : undefined
      updates.salePrice = salePrice ? parseFloat(salePrice) : undefined
    }

    updateProduct(product.id, updates)
    setSuccessMessage('Producto actualizado correctamente')
    setTimeout(() => {
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Editar {isTool ? 'Herramienta' : 'Material'}
          </DialogTitle>
          <DialogDescription>
            Modifica los datos del producto y guarda los cambios
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/20 text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Nombre <span className="text-danger">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Taladro Percutor"
            />
            {errors.name && (
              <div className="flex items-center gap-1 text-danger text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Descripción</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Taladro percutor de 18V"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Categoría <span className="text-danger">*</span>
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <div className="flex items-center gap-1 text-danger text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.category}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Ubicación <span className="text-danger">*</span>
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ubicación" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && (
              <div className="flex items-center gap-1 text-danger text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.location}
              </div>
            )}
          </div>

          {isTool && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Estado</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="in_use">En Uso</SelectItem>
                  <SelectItem value="damaged">Dañada</SelectItem>
                  <SelectItem value="repairing">En Reparación</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {!isTool && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Cantidad</label>
                  <Input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Stock Mínimo</label>
                  <Input
                    type="number"
                    min="0"
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Stock Máximo</label>
                  <Input
                    type="number"
                    min="0"
                    value={maxStock}
                    onChange={(e) => setMaxStock(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Precio Compra</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Precio Venta</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}