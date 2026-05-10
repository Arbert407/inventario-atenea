import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useInventory } from '@/hooks/useInventory'
import { DEFAULT_CATEGORIES, DEFAULT_LOCATIONS } from '@/data/mock'
import type { Product } from '@/types/product'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

type MaterialFormProps = Readonly<{
  onSuccess?: () => void
}>

export function MaterialForm({ onSuccess }: MaterialFormProps) {
  const { addProduct } = useInventory()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [quantity, setQuantity] = useState('')
  const [minStock, setMinStock] = useState('')
  const [maxStock, setMaxStock] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'El nombre es requerido'
    if (!category) newErrors.category = 'La categoría es requerida'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccessMessage('')

    if (!validate()) return

    const newMaterial: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      type: 'material',
      name: name.trim(),
      description: description.trim(),
      category,
      location: location || 'Almacén A',
      quantity: quantity ? parseInt(quantity, 10) : 0,
      minStock: minStock ? parseInt(minStock, 10) : 0,
      maxStock: maxStock ? parseInt(maxStock, 10) : 0,
      purchasePrice: purchasePrice ? parseFloat(purchasePrice) : undefined,
      salePrice: salePrice ? parseFloat(salePrice) : undefined,
    }

    addProduct(newMaterial)
    setSuccessMessage('Material guardado correctamente')
    setName('')
    setDescription('')
    setCategory('')
    setLocation('')
    setQuantity('')
    setMinStock('')
    setMaxStock('')
    setPurchasePrice('')
    setSalePrice('')
    setErrors({})
    onSuccess?.()
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-primary">
          Agregar Material
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              placeholder="Ej: Cemento Portland"
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
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Cemento portland gris 50kg"
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
            <label className="text-sm font-medium text-text-primary">Ubicación</label>
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
          </div>

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

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Guardar Material
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}