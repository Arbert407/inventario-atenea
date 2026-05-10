export type ProductType = 'tool' | 'material'

export type ToolStatus = 'available' | 'in_use' | 'damaged' | 'repairing'

export interface Product {
  id: string
  type: ProductType
  name: string
  description: string
  category: string
  location: string
  photo?: string
  status?: ToolStatus
  quantity?: number
  minStock?: number
  maxStock?: number
  purchasePrice?: number
  salePrice?: number
  createdAt: string
  updatedAt: string
}