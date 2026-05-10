# Análisis de Desarrollo de Software

## 1. Requisitos del Sistema

### Requisitos Funcionales
- **Gestión básica de inventario**: Registro, búsqueda, edición y eliminación de herramientas/materiales
- **Chequeo de herramientas**: Sistema para verificar estado de herramientas (disponible, en uso, dañada, etc.)
- **Control de materiales**: Gestión de inventario de materiales con stock mínimo y máximo
- **Pantalla Home**: Dashboard que muestra actualización en tiempo real de cantidad de materiales
- **Reportes y categorías**: Reportes, exportación, categorías, ubicaciones

### Requisitos No Funcionales
- **Responsive/Multiplataforma**: Acceso desde múltiples dispositivos

---

## 2. Análisis de Viabilidad

### Viabilidad Técnica
- Desarrollo individual
- Sin presupuesto para servicios externos

### Viabilidad Operativa
- Sistema para talleres técnicos
- Usuario único o múltiples usuarios en diferentes talleres

---

## 3. Arquitectura y Diseño

### Arquitectura Técnica
- Aplicación web con almacenamiento local en el navegador

### Componentes Principales
- Interface de usuario responsiva
- Dashboard/Home con resumen de inventario
- Módulo de gestión de items (CRUD)
- Módulo de chequeo de herramientas
- Módulo de control de materiales
- Módulo de control de movimientos (entrada/salida)
- Módulo de reportes y categorías

### Propiedades de Productos
#### Herramientas
- Nombre
- Descripción
- Categoría
- Ubicación en taller
- Estado (disponible, en uso, dañada, en reparación)
- Foto (opcional)

#### Materiales
- Nombre
- Descripción
- Categoría
- Ubicación
- Cantidad actual
- Stock mínimo
- Stock máximo
- Precio de compra
- Precio de venta
- Foto (opcional)

---

## 4. Gestión de Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|-------|--------------|---------|------------|
| Pérdida de datos al limpiar cache del navegador | Baja | Alto | Exportación periódica a CSV/Excel |
| Limitaciones de almacenamiento local | Media | Medio | Diseño eficiente de datos |

---

## 5. Cronograma y Recursos

### Timeline
- **Estimación**: Menos de 1 mes
- **Fases**:
  - Fase 1: Setup y estructura base (Semana 1)
  - Fase 2: Gestión básica de items (Semana 2)
  - Fase 3: Control de movimientos (Semana 3)
  - Fase 4: Reportes y exportación (Semana 4)

### Recursos Necesarios
- Desarrollador: 1 persona
- Herramientas: Editor de código (VS Code)

### Costos Estimados
- Costo total: $0 (herramientas gratuitas)

---

## 6. Casos de Uso y Escenarios

### Casos de Uso
- **UC-01**: Agregar nueva herramienta/material al inventario
- **UC-02**: Buscar items por nombre, categoría o ubicación
- **UC-03**: Editar información de un item
- **UC-04**: Eliminar un item del inventario
- **UC-05**: Chequear estado de herramienta (disponible/en uso/dañada)
- **UC-06**: Actualizar estado de herramienta
- **UC-07**: Control de cantidad de materiales (entrada/salida)
- **UC-08**: Alerta de stock bajo de materiales
- **UC-09**: Registrar movimiento de entrada
- **UC-10**: Registrar movimiento de salida (préstamo)
- **UC-11**: Registrar devolución de item
- **UC-12**: Exportar inventario a CSV/Excel

### Escenarios de Usuario
- **Escenario 1**: Técnico toma herramienta del taller y registra su salida
- **Escenario 2**: Técnico devuelve herramienta y registra su entrada
- **Escenario 3**: Administrador revisa inventario y genera reporte

---

## 7. Integraciones

### Sistemas Externos
- No requiere integración con otros sistemas

### APIs Requeridas
- Importación/Exportación a CSV/Excel

---

## 8. Métricas de Éxito

### Criterios de Evaluación
- **Gestión básica funcionando**: Sistema permite agregar, editar, buscar y eliminar items
- **Control exacto de inventario**: Registro preciso de herramientas prestadas y devueltas

### KPIs
- Tiempo de respuesta de la interface < 1 segundo
- Exactitud del conteo de inventario = 100%
- Exportación de datos funcionales