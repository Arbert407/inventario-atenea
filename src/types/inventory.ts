export type MovementType = 'entry' | 'exit' | 'return'

export interface Movement {
  id: string
  productId: string
  type: MovementType
  quantity: number
  notes?: string
  date: string
}