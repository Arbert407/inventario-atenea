import type { Product, ProductType, ToolStatus } from '@/types/product'

export const DEFAULT_CATEGORIES = [
  'Herramientas de Mano',
  'Herramientas Eléctricas',
  'Materiales de Construcción',
  'Pinturas',
  'Hierros y Metales',
  'Madera',
  'Electricidad',
  'Plomería',
]

export const DEFAULT_LOCATIONS = [
  'Almacén A',
  'Almacén B',
  'Taller Principal',
  'Oficina',
]

export const TOOL_STATUS_LABELS: Record<ToolStatus, string> = {
  available: 'Disponible',
  in_use: 'En Uso',
  damaged: 'Dañada',
  repairing: 'En Reparación',
}

export const TOOL_STATUS_COLORS: Record<ToolStatus, string> = {
  available: 'text-success',
  in_use: 'text-warning',
  damaged: 'text-danger',
  repairing: 'text-info',
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    type: 'tool' as ProductType,
    name: 'Taladro Percutor',
    description: 'Taladro percutor de 18V marca Makita',
    category: 'Herramientas Eléctricas',
    location: 'Taller Principal',
    status: 'available' as ToolStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'tool' as ProductType,
    name: 'Martillo',
    description: 'Martillo de carpintero 500g',
    category: 'Herramientas de Mano',
    location: 'Almacén A',
    status: 'available' as ToolStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    type: 'material' as ProductType,
    name: 'Cemento Portland',
    description: 'Cemento portland gris 50kg',
    category: 'Materiales de Construcción',
    location: 'Almacén B',
    quantity: 20,
    minStock: 5,
    maxStock: 50,
    purchasePrice: 8.5,
    salePrice: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]