import { useLocalStorage } from './useLocalStorage'
import type { Product } from '@/types/product'

const STORAGE_KEY = 'inventory-products'

export function useInventory() {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEY, [])

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProducts((prev) => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      )
    )
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const getProduct = (id: string) => {
    return products.find((p) => p.id === id)
  }

  const getTools = () => products.filter((p) => p.type === 'tool')

  const getMaterials = () => products.filter((p) => p.type === 'material')

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    )
  }

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getTools,
    getMaterials,
    searchProducts,
  }
}