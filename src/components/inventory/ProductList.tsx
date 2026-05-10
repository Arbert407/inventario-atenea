import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useInventory } from '@/hooks/useInventory'
import { useTheme } from '@/hooks/useTheme'
import { TOOL_STATUS_LABELS, TOOL_STATUS_COLORS } from '@/data/mock'
import type { Product, ProductType } from '@/types/product'
import { Package, Wrench, PackageX, Pencil } from 'lucide-react'
import { ProductEdit } from './ProductEdit'

type ProductListProps = Readonly<{
  filterType?: ProductType | 'all'
}>

export function ProductList({ filterType = 'all' }: ProductListProps) {
  const { products } = useInventory()
  const { theme } = useTheme()
  const [typeFilter, setTypeFilter] = useState<ProductType | 'all'>('all')
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((p) => {
    if (typeFilter === 'all') return true
    return p.type === typeFilter
  })

  const textStyles = {
    dark: { primary: '#E5E7EB', secondary: '#9CA3AF', muted: '#6B7280' },
    light: { primary: '#E5E7EB', secondary: '#9CA3AF', muted: '#6B7280' },
  }
  const s = textStyles[theme]
  const btnVariant = theme === 'dark' ? 'default' : 'primary'

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: s.primary }}>
          Productos
        </h2>
        <p className="mt-1" style={{ color: s.secondary }}>Lista de todos los productos en inventario</p>
      </div>

      <div className="flex gap-2">
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
          <Wrench className="w-4 h-4 mr-2" />
          Herramientas ({products.filter((p) => p.type === 'tool').length})
        </Button>
        <Button
          variant={typeFilter === 'material' ? btnVariant : theme === 'dark' ? 'outline' : 'outlineLight'}
          size="sm"
          onClick={() => setTypeFilter('material')}
        >
          <Package className="w-4 h-4 mr-2" />
          Materiales ({products.filter((p) => p.type === 'material').length})
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState type={typeFilter} theme={theme} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => setEditProduct(product)}
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
        </>
      )}

      <p className="text-sm text-center" style={{ color: s.muted }}>
        Mostrando {filteredProducts.length} de {products.length} productos
      </p>
    </div>
  )
}

type ProductCardProps = Readonly<{
  product: Product
  onEdit: () => void
  theme: 'dark' | 'light'
}>

function ProductCard({ product, onEdit, theme }: ProductCardProps) {
  const isTool = product.type === 'tool'
  const textStyles = {
    dark: { primary: '#E5E7EB', secondary: '#9CA3AF', muted: '#6B7280' },
    light: { primary: '#1F2937', secondary: '#4B5563', muted: '#6B7280' },
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
              <button
                type="button"
                onClick={onEdit}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: s.secondary }}
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm truncate" style={{ color: s.secondary }}>{product.description}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span 
                className="text-xs px-2 py-1 rounded"
                style={{ 
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  color: s.secondary 
                }}
              >
                {product.category}
              </span>
              <span 
                className="text-xs px-2 py-1 rounded"
                style={{ 
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
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