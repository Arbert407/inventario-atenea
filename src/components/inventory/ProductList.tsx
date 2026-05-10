import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useInventory } from '@/hooks/useInventory'
import { useTheme } from '@/hooks/useTheme'
import { TOOL_STATUS_LABELS, TOOL_STATUS_COLORS } from '@/data/mock'
import type { Product, ProductType } from '@/types/product'
import { Package, Wrench, PackageX, Pencil, Trash2, Search, X, ChevronDown, Clock, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { ProductEdit } from './ProductEdit'
import { DeleteConfirm } from './DeleteConfirm'
import { ProductHistory } from './ProductHistory'
import { RegisterMovement } from './RegisterMovement'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ProductListProps = Readonly<{
  filterType?: ProductType | 'all'
}>

export function ProductList({ filterType = 'all' }: ProductListProps) {
  const { products, deleteProduct, searchProducts } = useInventory()
  const { theme } = useTheme()
const [typeFilter, setTypeFilter] = useState<ProductType | 'all'>(filterType || 'all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [viewHistoryProduct, setViewHistoryProduct] = useState<Product | null>(null)
  const [movementProduct, setMovementProduct] = useState<Product | null>(null)
  const [movementType, setMovementType] = useState<'entry' | 'exit' | 'return'>('entry')

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category))
    return Array.from(cats).sort()
  }, [products])

  const locations = useMemo(() => {
    const locs = new Set(products.map((p) => p.location))
    return Array.from(locs).sort()
  }, [products])

  const toolStatuses = ['available', 'in_use', 'damaged', 'repairing']

  const searchedProducts = searchQuery.trim()
    ? searchProducts(searchQuery).filter((p) => typeFilter === 'all' || p.type === typeFilter)
    : products.filter((p) => typeFilter === 'all' || p.type === typeFilter)

  const filteredProducts = searchedProducts.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    const matchesLocation = locationFilter === 'all' || p.location === locationFilter
    const matchesStatus = statusFilter === 'all' || (p.type === 'tool' && p.status === statusFilter)
    return matchesCategory && matchesLocation && matchesStatus
  })

  const textStyles = {
    dark: { primary: '#E5E7EB', secondary: '#9CA3AF', muted: '#6B7280' },
    light: { primary: '#D1D5DB', secondary: '#9CA3AF', muted: '#6B7280' },
  }
  const s = textStyles[theme]
  const btnVariant = theme === 'dark' ? 'default' : 'primary'

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: s.primary }}>
          {filterType === 'tool' ? 'Herramientas' : filterType === 'material' ? 'Materiales' : 'Productos'}
        </h2>
        <p className="mt-1" style={{ color: s.secondary }}>
          {filterType === 'tool' ? 'Lista de herramientas' : filterType === 'material' ? 'Lista de materiales' : 'Lista de todos los productos en inventario'}
        </p>
      </div>

      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: s.muted }} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-xl pl-10 pr-10 transition-all focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: s.primary,
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors"
              style={{ color: s.muted }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={typeFilter === 'all' ? btnVariant : theme === 'dark' ? 'outline' : 'outlineLight'}
          size="sm"
          onClick={() => setTypeFilter('all')}
        >
          Todos ({products.length})
        </Button>
        <Button
          variant={typeFilter === 'tool' ? btnVariant : theme === 'dark' ? 'outline' : 'outlineLight'}
          size="sm"
          onClick={() => setTypeFilter('tool')}
        >
          <Wrench className="w-4 h-4 mr-1" />
          ({products.filter((p) => p.type === 'tool').length})
        </Button>
        <Button
          variant={typeFilter === 'material' ? btnVariant : theme === 'dark' ? 'outline' : 'outlineLight'}
          size="sm"
          onClick={() => setTypeFilter('material')}
        >
          <Package className="w-4 h-4 mr-1" />
          ({products.filter((p) => p.type === 'material').length})
        </Button>

        {categories.length > 0 && (
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] h-8" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: s.primary }}>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: '#1F2937', borderColor: 'rgba(255,255,255,0.1)' }}>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {locations.length > 0 && (
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[140px] h-8" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: s.primary }}>
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: '#1F2937', borderColor: 'rgba(255,255,255,0.1)' }}>
              <SelectItem value="all">Todas</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filterType === 'tool' && toolStatuses.length > 0 && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-8" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: s.primary }}>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: '#1F2937', borderColor: 'rgba(255,255,255,0.1)' }}>
              <SelectItem value="all">Todos</SelectItem>
              {toolStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'available' ? 'Disponible' : status === 'in_use' ? 'En Uso' : status === 'damaged' ? 'Dañada' : 'Reparación'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        searchQuery || categoryFilter !== 'all' || locationFilter !== 'all' || statusFilter !== 'all' ? (
          <div className="text-center py-12">
            <PackageX className="w-16 h-16 mx-auto mb-4" style={{ color: s.muted, opacity: 0.3 }} />
            <p className="text-lg" style={{ color: s.secondary }}>No se encontraron resultados</p>
            <p className="text-sm mt-1" style={{ color: s.muted }}>
              No hay productos que coincidan con los filtros seleccionados
            </p>
          </div>
        ) : (
          <EmptyState type={typeFilter} theme={theme} />
        )
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
<ProductCard
                key={product.id}
                product={product}
                onEdit={() => setEditProduct(product)}
                onDelete={() => setProductToDelete(product)}
                onHistory={() => setViewHistoryProduct(product)}
                onMove={(type) => {
                  setMovementType(type)
                  setMovementProduct(product)
                }}
                theme={theme}
              />
            ))}
          </div>
          {editProduct && (
            <ProductEdit
              product={editProduct}
              open={!!editProduct}
              onOpenChange={(open) => !open && setEditProduct(null)}
            />
          )}
          {productToDelete && (
            <DeleteConfirm
              product={productToDelete}
              open={!!productToDelete}
              onOpenChange={(open) => !open && setProductToDelete(null)}
              onConfirm={() => {
                deleteProduct(productToDelete.id)
                setProductToDelete(null)
              }}
            />
          )}
          {viewHistoryProduct && (
            <ProductHistory
              product={viewHistoryProduct}
              open={!!viewHistoryProduct}
              onOpenChange={(open) => !open && setViewHistoryProduct(null)}
            />
          )}
          {movementProduct && (
            <RegisterMovement
              product={movementProduct}
              type={movementType}
              open={!!movementProduct}
              onOpenChange={(open) => !open && setMovementProduct(null)}
            />
          )}
        </>
      )}

      <p className="text-sm text-center" style={{ color: s.muted }}>
        Mostrando {filteredProducts.length} de {products.length} productos
        {searchQuery && ` (búsqueda: "${searchQuery}")`}
        {categoryFilter !== 'all' && ` (categoría: ${categoryFilter})`}
        {locationFilter !== 'all' && ` (ubicación: ${locationFilter})`}
        {statusFilter !== 'all' && ` (estado: ${statusFilter})`}
      </p>
    </div>
  )
}

type ProductCardProps = Readonly<{
  product: Product
  onEdit: () => void
  onDelete: () => void
  onHistory?: () => void
  onMove?: (type: 'entry' | 'exit' | 'return') => void
  theme: 'dark' | 'light'
}>

function ProductCard({ product, onEdit, onDelete, onHistory, onMove, theme }: ProductCardProps) {
  const isTool = product.type === 'tool'
  const textStyles = {
    dark: { primary: '#E5E7EB', secondary: '#9CA3AF', muted: '#6B7280' },
    light: { primary: '#D1D5DB', secondary: '#9CA3AF', muted: '#6B7280' },
  }
  const s = textStyles[theme]

  return (
    <Card className="glass-card hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ 
              backgroundColor: theme === 'dark' ? 'rgba(76,201,240,0.1)' : 'rgba(249,115,22,0.1)',
              color: theme === 'dark' ? '#4CC9F0' : '#F97316'
            }}
          >
            {isTool ? <Wrench className="w-5 h-5" /> : <Package className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold truncate" style={{ color: s.primary }}>{product.name}</h3>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onHistory}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: s.secondary }}
                  title="Ver historial"
                >
                  <Clock className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onEdit}
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: s.secondary }}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  className="p-1.5 rounded-lg transition-colors hover:text-danger"
                  style={{ color: s.secondary }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm truncate" style={{ color: s.secondary }}>{product.description}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span 
                className="text-xs px-2 py-1 rounded"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: s.secondary 
                }}
              >
                {product.category}
              </span>
              <span 
                className="text-xs px-2 py-1 rounded"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: s.secondary 
                }}
              >
                {product.location}
              </span>
              {isTool && product.status && (
                <span className={`text-xs px-2 py-1 rounded ${TOOL_STATUS_COLORS[product.status]}`}>
                  {TOOL_STATUS_LABELS[product.status]}
                </span>
              )}
            </div>
            {!isTool && product.quantity !== undefined && (
              <div className="mt-2 text-sm">
                <span className="font-medium" style={{ color: s.primary }}>Cantidad: </span>
                <span style={{ color: s.secondary }}>{product.quantity}</span>
                {product.minStock !== undefined && product.quantity !== undefined && product.quantity < product.minStock && (
                  <span className="ml-2 text-danger text-xs">(Stock bajo)</span>
                )}
                <div className="flex gap-1 mt-1">
                  <button
                    type="button"
                    onClick={() => onMove?.('entry')}
                    className="text-xs px-2 py-1 rounded bg-success/20 text-success hover:bg-success/30"
                    title="Registrar entrada"
                  >
                    +Entrada
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove?.('exit')}
                    className="text-xs px-2 py-1 rounded bg-warning/20 text-warning hover:bg-warning/30"
                    title="Registrar salida"
                  >
                    -Salida
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type EmptyStateProps = Readonly<{
  type: ProductType | 'all'
  theme: 'dark' | 'light'
}>

function EmptyState({ type, theme }: EmptyStateProps) {
  const messages: Record<ProductType | 'all', string> = {
    all: 'No hay productos registrados',
    tool: 'No hay herramientas registradas',
    material: 'No hay materiales registrados',
  }
  const textStyles = {
    dark: { secondary: '#9CA3AF', muted: '#6B7280' },
    light: { secondary: '#4B5563', muted: '#6B7280' },
  }
  const s = textStyles[theme]

  return (
    <div className="text-center py-12">
      <PackageX className="w-16 h-16 mx-auto mb-4" style={{ color: s.muted, opacity: 0.3 }} />
      <p className="text-lg" style={{ color: s.secondary }}>{messages[type]}</p>
      <p className="text-sm mt-1" style={{ color: s.muted }}>
        Agrega productos desde el menú de navegación
      </p>
    </div>
  )
}