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

type ToolFormProps = Readonly<{
  onSuccess?: () => void
}>

export function ToolForm({ onSuccess }: ToolFormProps) {
  const { addProduct } = useInventory()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

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

    const newTool: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      type: 'tool',
      name: name.trim(),
      description: description.trim(),
      category,
      location,
      status: 'available',
    }

    addProduct(newTool)
    setSuccessMessage('Herramienta guardada correctamente')
    setName('')
    setDescription('')
    setCategory('')
    setLocation('')
    setErrors({})
    onSuccess?.()
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-primary">
          Agregar Herramienta
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
            <Input
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

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Guardar Herramienta
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}