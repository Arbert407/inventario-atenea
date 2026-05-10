import { useLocalStorage } from './useLocalStorage'
import type { Movement } from '@/types/inventory'

const MOVEMENTS_KEY = 'inventory-movements'

export function useMovements() {
  const [movements, setMovements] = useLocalStorage<Movement[]>(MOVEMENTS_KEY, [])

  const addMovement = (productId: string, type: Movement['type'], quantity: number, notes?: string) => {
    const newMovement: Movement = {
      id: crypto.randomUUID(),
      productId,
      type,
      quantity,
      notes,
      date: new Date().toISOString(),
    }
    setMovements((prev) => [newMovement, ...prev])
    return newMovement
  }

  const getProductMovements = (productId: string) => {
    return movements
      .filter((m) => m.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getMovementsByType = (productId: string, type: Movement['type']) => {
    return movements.filter((m) => m.productId === productId && m.type === type)
  }

  return {
    movements,
    addMovement,
    getProductMovements,
    getMovementsByType,
  }
}