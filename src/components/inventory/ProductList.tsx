import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useInventory } from '@/hooks/useInventory'
import { TOOL_STATUS_LABELS, TOOL_STATUS_COLORS } from '@/data/mock'
import type { Product, ProductType } from '@/types/product'
import { Package, Wrench, PackageX, Pencil } from 'lucide-react'
import { ProductEdit } from './ProductEdit'

type ProductListProps = Readonly<{
  filterType?: ProductType | 'all'
}>

export function ProductList({ filterType = 'all' }: ProductListProps) {
  const { products } = useInventory()
  const [typeFilter, setTypeFilter] = useState<ProductType | 'all'>('all')
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((p) => {
    if (typeFilter === 'all') return true
    return p.type === typeFilter
  })

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold text-text-primary tracking-tight">Productos</h2>
        <p className="text-text-secondary mt-1">Lista de todos los productos en inventario</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={typeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTypeFilter('all')}
        >
          Todos ({products.length})
        </Button>
        <Button
          variant={typeFilter === 'tool' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTypeFilter('tool')}
        >
          <Wrench className="w-4 h-4 mr-2" />
          Herramientas ({products.filter((p) => p.type === 'tool').length})
        </Button>
        <Button
          variant={typeFilter === 'material' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTypeFilter('material')}
        >
          <Package className="w-4 h-4 mr-2" />
          Materiales ({products.filter((p) => p.type === 'material').length})
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState type={typeFilter} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => setEditProduct(product)}
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

      <p className="text-text-muted text-sm text-center">
        Mostrando {filteredProducts.length} de {products.length} productos
      </p>
    </div>
  )
}

type ProductCardProps = Readonly<{
  product: Product
  onEdit: () => void
}>

function ProductCard({ product, onEdit }: ProductCardProps) {
  const isTool = product.type === 'tool'

  return (
    <Card className="glass-card hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {isTool ? <Wrench className="w-5 h-5" /> : <Package className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-primary truncate">{product.name}</h3>
              <button
                type="button"
                onClick={onEdit}
                className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-text-secondary truncate">{product.description}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded bg-white/10 text-text-secondary">
                {product.category}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-white/10 text-text-secondary">
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
                <span className="text-text-primary font-medium">Cantidad: </span>
                <span className="text-text-secondary">{product.quantity}</span>
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
}>

function EmptyState({ type }: EmptyStateProps) {
  const messages: Record<ProductType | 'all', string> = {
    all: 'No hay productos registrados',
    tool: 'No hay herramientas registradas',
    material: 'No hay materiales registrados',
  }

  return (
    <div className="text-center py-12">
      <PackageX className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-30" />
      <p className="text-text-secondary text-lg">{messages[type]}</p>
      <p className="text-text-muted text-sm mt-1">
        Agrega productos desde el menú de navegación
      </p>
    </div>
  )
}