# Stack Técnico - Inventario Atenea

## Tecnologías

- **Frontend**: React (Vite)
- **Estilos**: Tailwind CSS (customizado para UI-GUIDE)
- **Componentes**: shadcn/ui (personalizado)
- **Persistencia**: LocalStorage
- **Diseño**: Glassmorphism Dark Mode

## Estructura del Proyecto

```
inventario-atenea/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── inventory/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── data/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Descripción de Carpetas

### `src/components/ui/`
**Propósito**: Componentes base de la interfaz de usuario(shadcn/ui)
**Contenido**:
- `button.tsx` - Botones reutilizables
- `input.tsx` - Campos de entrada de texto
- `card.tsx` - Tarjetas para mostrar contenido
- `select.tsx` - Listas desplegables
- `dialog.tsx` - Ventanas modales
- `table.tsx` - Tablas de datos
- `label.tsx` - Etiquetas para formularios
- `textarea.tsx` - Campos de texto largo

### `src/components/layout/`
**Propósito**: Estructura visual de la aplicación
**Contenido**:
- `Header.tsx` - Barra superior con título y navegación
- `Sidebar.tsx` - Menú lateral de navegación
- `Layout.tsx` - Contenedor principal

### `src/components/inventory/`
**Propósito**: Componentes específicos del negocio
**Contenido**:
- `Dashboard.tsx` - Pantalla Home con resumen de inventario
- `ProductList.tsx` - Lista de productos (herramientas/materiales)
- `ProductCard.tsx` - Tarjeta individual de producto
- `ProductForm.tsx` - Formulario para agregar/editar productos
- `ToolCheck.tsx` - Módulo de chequeo de herramientas
- `MaterialControl.tsx` - Control de stock de materiales
- `MovementLog.tsx` - Historial de movimientos
- `CategoryManager.tsx` - Gestión de categorías

### `src/hooks/`
**Propósito**: Lógica reutilizable de la aplicación ( estado y funciones)
**Contenido**:
- `useInventory.ts` - Gestiona el estado global del inventario (CRUD)
- `useLocalStorage.ts` - Maneja la persistencia en LocalStorage
- `useProducts.ts` - Lógica para filtrar/buscar productos
- `useToolStatus.ts` - Manejo de estados de herramientas
- `useMaterialStock.ts` - Control de stock de materiales

### `src/lib/`
**Propósito**: Utilidades y funciones helper
**Contenido**:
- `utils.ts` - Funciones auxiliares (cn() helper para shadcn)
- `storage.ts` - Utilidades para LocalStorage (get, set, remove)

### `src/types/`
**Propósito**: Definiciones de tipos TypeScript
**Contenido**:
- `product.ts` - Tipos para productos (herramientas/materiales)
- `inventory.ts` - Tipos para movimientos de inventario

### `src/data/`
**Propósito**: Datos iniciales y mocks
**Contenido**:
- `mock.ts` - Datos de ejemplo para pruebas
- `categories.ts` - Categorías predefinidas

## Tipos de Datos (TypeScript)

### Producto (Herramienta o Material)
```typescript
interface Product {
  id: string;
  type: 'tool' | 'material';
  name: string;
  description: string;
  category: string;
  location: string;
  photo?: string;
  // Para herramientas
  status?: 'available' | 'in_use' | 'damaged' | 'repairing';
  // Para materiales
  quantity?: number;
  minStock?: number;
  maxStock?: number;
  purchasePrice?: number;
  salePrice?: number;
  createdAt: string;
  updatedAt: string;
}
```

### Movimiento
```typescript
interface Movement {
  id: string;
  productId: string;
  type: 'entry' | 'exit' | 'return';
  quantity: number;
  notes?: string;
  date: string;
}
```

## Dependencias Principales

- react
- react-dom
- tailwindcss
- @radix-ui/react-* (para shadcn)
- lucide-react (iconos)
- class-variance-authority
- clsx
- tailwind-merge

## Anti-Caché (F5)

El proyecto usa Service Worker para evitar caché del navegador:

```javascript
// sw.js
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.origin !== location.origin) return;

    // Agregar timestamp para evitar caché
    url.searchParams.set('nocache', Date.now().toString());
    const noCacheRequest = new Request(url.toString());

    event.respondWith(
        caches.match(event.request).then((cached) => {
            return fetch(noCacheRequest)
                .then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => cached || new Response('Offline', { status: 503 }));
        })
    );
});
```

## Configuración de Estilos (UI-GUIDE)

### tailwind.config.js
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4CC9F0',
        'primary-dark': '#3AA7CC',
        secondary: '#F5C518',
        success: '#22C55E',
        warning: '#EAB308',
        danger: '#EF4444',
        info: '#60A5FA',
        background: '#0F172A',
        surface: 'rgba(255,255,255,0.08)',
        'text-primary': '#E5E7EB',
        'text-secondary': '#9CA3AF',
        'text-muted': '#6B7280',
        border: 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
};
```

### CSS Variables (index.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #4CC9F0;
  --primary-dark: #3AA7CC;
  --secondary: #F5C518;
  --success: #22C55E;
  --warning: #EAB308;
  --danger: #EF4444;

  --bg: #0F172A;
  --surface: rgba(255,255,255,0.08);
  --text-primary: #E5E7EB;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  --border: rgba(255,255,255,0.12);

  --shadow-sm: 0 2px 8px rgba(0,0,0,0.2);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.3);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.4);

  --transition-fast: all 0.15s ease-out;
  --transition-normal: all 0.3s ease;
  --transition-slow: all 0.5s ease;
}
```

## Estilos de Componentes (Personalizados)

### Card (Glassmorphism)
```css
.glass-card {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  padding: 24px;
}
```

### Botones
- Primary: Background #4CC9F0, texto #0F172A
- Hover: brillo + elevación
- Active: scale(0.97)

### Inputs
- Height: 40px
- Border radius: 12px
- Background: rgba(255,255,255,0.05)
- Border: 1px solid rgba(255,255,255,0.12)
- Focus: glow azul (#4CC9F0)

## Deploy

- **Plataforma**: Netlify
- **Build**: `npm run build`
- **Output**: dist/

## Footer

El footer debe mostrar copyright, autor y nombre del sistema.

### Formato
```
© {año} {autor}. {Nombre del Sistema}
```

### Ejemplo
```
© 2026 albert.407 Inventario Atenea
```

### Estilos
- Posición: Fixed en la parte inferior derecha
- Color: var(--text-muted)
- Tamaño de fuente: 11px
- Opacidad: 0.6
- Background: transparent
- Padding: 12px 0

---

## Convenciones TypeScript

### Props de Componentes
Para evitar el code smell "Mark the props of the component as read-only", usar `type` con `Readonly`:

```typescript
// ❌ Incorrecto - interface mutable
interface ButtonProps {
  label: string
  onClick: () => void
}

// ✅ Correcto - type inmutable
type ButtonProps = Readonly<{
  label: string
  onClick: () => void
}>
```

### Números
No usar fracciones decimales innecesarias:

```typescript
// ❌ Incorrecto
const price = 12.0

// ✅ Correcto
const price = 12
```

Opcionalmente usar el patrón de shadcn/ui:
```typescript
// ✅ Correcto - tipo con intersección
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }
```