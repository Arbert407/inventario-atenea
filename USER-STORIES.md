# USER-STORIES.md

## Historial de US

| US | Título | Complejidad | Estado |
|----|--------|-------------|--------|
| US-001 | Agregar herramienta | 2 | Completada |
| US-002 | Agregar material | 2 | Completada |
| US-003 | Listar productos | 1 | Completada |
| US-004 | Editar producto | 2 | Completada |
| US-005 | Eliminar producto | 2 | Pendiente |
| US-006 | Buscar productos | 2 | Pendiente |
| US-007 | Filtrar por tipo | 1 | Pendiente |
| US-008 | Filtrar por categoría | 1 | Pendiente |
| US-009 | Filtrar por ubicación | 1 | Pendiente |
| US-010 | Ver dashboard | 2 | Pendiente |
| US-011 | Mostrar total materiales | 1 | Pendiente |
| US-012 | Mostrar herramientas por estado | 2 | Pendiente |
| US-013 | Mostrar alertas stock bajo | 2 | Pendiente |
| US-014 | Ver lista herramientas | 1 | Pendiente |
| US-015 | Cambiar estado herramienta | 2 | Pendiente |
| US-016 | Ver historial herramienta | 2 | Pendiente |
| US-017 | Filtrar por estado | 1 | Pendiente |
| US-018 | Ver lista materiales | 1 | Pendiente |
| US-019 | Registrar entrada material | 2 | Pendiente |
| US-020 | Registrar salida material | 2 | Pendiente |
| US-021 | Definir stock mínimo | 1 | Pendiente |
| US-022 | Definir stock máximo | 1 | Pendiente |
| US-023 | Definir precio compra | 1 | Pendiente |
| US-024 | Definir precio venta | 1 | Pendiente |
| US-025 | Ver alerta stock bajo | 2 | Pendiente |
| US-026 | Registrar entrada movimiento | 2 | Pendiente |
| US-027 | Registrar salida movimiento | 2 | Pendiente |
| US-028 | Registrar devolución | 2 | Pendiente |
| US-029 | Ver historial movimientos | 2 | Pendiente |
| US-030 | Agregar nota a movimiento | 1 | Pendiente |
| US-031 | Exportar a CSV | 2 | Pendiente |
| US-032 | Exportar a Excel | 2 | Pendiente |
| US-033 | Iniciar chequeo de inventario | 2 | Pendiente |
| US-034 | Iniciar chequeo por filtro | 2 | Pendiente |
| US-035 | Mostrar pregunta de herramienta | 1 | Pendiente |
| US-036 | Registrar respuesta SI/NO | 2 | Pendiente |
| US-037 | Mostrar herramientas no encontradas | 2 | Pendiente |
| US-038 | Finalizar chequeo | 1 | Pendiente |
| US-039 | Incrementar cantidad rápido | 1 | Pendiente |
| US-040 | Decrementar cantidad rápido | 1 | Pendiente |

---

## US-001: Agregar herramienta

### Descripción
Como usuario, quiero agregar una nueva herramienta al inventario para registrarla en el sistema.

### Criterios de Aceptación
- [x] Formulario de herramienta con todos los campos
- [x] Validar campos obligatorios (nombre, categoría, ubicación)
- [x] Guardar en inventario
- [x] Mostrar mensaje de éxito después de guardar
- [x] Limpiar formulario después de guardar

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Verificar que herramienta aparece en lista
- [ ] Verificar mensaje de éxito después de guardar

### Bloqueos
Ninguno

---

## US-002: Agregar material

### Descripción
Como usuario, quiero agregar un nuevo material al inventario para registrarla en el sistema.

### Criterios de Aceptación
- [x] Formulario de material con todos los campos
- [x] Validar campos obligatorios (nombre, categoría)
- [x] Guardar en inventario
- [x] Mostrar mensaje de éxito después de guardar
- [x] Limpiar formulario después de guardar

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Verificar que material aparece en lista

### Bloqueos
Ninguno

---

## US-003: Listar productos

### Descripción
Como usuario, quiero ver la lista de todos los productos del inventario.

### Criterios de Aceptación
- [x] Mostrar todos los productos
- [x] Visualización por tipo
- [x] Mostrar nombre y cantidad de cada producto
- [x] Mostrar vacío si no hay productos

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Verificar que muestra todos los productos
- [ ] Verificar mensaje cuando no hay productos

### Bloqueos
US-001, US-002

---

## US-004: Editar producto

### Descripción
Como usuario, quiero editar la información de un producto existente.

### Criterios de Aceptación
- [x] Cargar datos existentes en formulario
- [x] Modificar campos deseados
- [x] Validar campos obligatorios
- [x] Guardar cambios
- [x] Mostrar mensaje de éxito

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Verificar cambios guardados
- [ ] Verificar mensaje de éxito

### Bloqueos
US-003

---

## US-005: Eliminar producto

### Descripción
Como usuario, quiero eliminar un producto del inventario.

### Criterios de Aceptación
- [ ] Botón de eliminar en cada producto
- [ ] Confirmar eliminación con modal o confirmación
- [ ] Eliminar del inventario
- [ ] Mostrar mensaje de confirmación

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Verificar que no aparece en lista

### Bloqueos
US-003

---

## US-006: Buscar productos

### Descripción
Como usuario, quiero buscar productos por nombre.

### Criterios de Aceptación
- [ ] Campo de búsqueda visible
- [ ] Buscar mientras escribe (tiempo real)
- [ ] Resultados en tiempo real
- [ ] Mostrar mensaje si no hay resultados
- [ ] Limpiar búsqueda

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Buscar por nombre muestra resultados

### Bloqueos
US-003

---

## US-007: Filtrar por tipo

### Descripción
Como usuario, quiero filtrar productos por tipo (herramienta/material).

### Criterios de Aceptación
- [ ] Filtro por tipo (herramienta/material)
- [ ] Mostrar solo el tipo seleccionado
- [ ] Botón para quitar filtro
- [ ] Contador de resultados

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Filtro muestra solo herramientas
- [ ] Filtro muestra solo materiales

### Bloqueos
US-003

---

## US-008: Filtrar por categoría

### Descripción
Como usuario, quiero filtrar productos por categoría.

### Criterios de Aceptación
- [ ] Filtro por categoría
- [ ] Lista desplegable de categorías
- [ ] Mostrar solo los de esa categoría
- [ ] Botón para quitar filtro

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Filtro muestra solo categoría seleccionada

### Bloqueos
US-003

---

## US-009: Filtrar por ubicación

### Descripción
Como usuario, quiero filtrar productos por ubicación.

### Criterios de Aceptación
- [ ] Filtro por ubicación
- [ ] Lista desplegable de ubicaciones
- [ ] Mostrar solo los de esa ubicación
- [ ] Botón para quitar filtro

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Filtro muestra solo ubicación seleccionada

### Bloqueos
US-003

---

## US-010: Ver dashboard

### Descripción
Como usuario, quiero ver un dashboard en la pantalla principal.

### Criterios de Aceptación
- [ ] Mostrar dashboard en ruta principal
- [ ] Resumen de inventario
- [ ] Actualización en tiempo real
- [ ] Navegación rápida a otras secciones

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 2 horas |

### Ideas de Test
- [ ] Dashboard muestra resumen

### Bloqueos
US-011, US-012, US-013

---

## US-011: Mostrar total materiales

### Descripción
Como usuario, quiero ver la cantidad total de materiales en el dashboard.

### Criterios de Aceptación
- [ ] Mostrar cantidad total de materiales
- [ ] Actualización en tiempo real cuando cambia stock
- [ ] Formato de número legible

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Cantidad correcta

### Bloqueos
US-003

---

## US-012: Mostrar herramientas por estado

### Descripción
Como usuario, quiero ver la cantidad de herramientas por cada estado en el dashboard.

### Criterios de Aceptación
- [ ] Mostrar por estado (disponible, en uso, dañada, reparación)
- [ ] Conteo por estado
- [ ] Indicador visual por estado
- [ ] Total de herramientas

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Conteo correcto por estado

### Bloqueos
US-014

---

## US-013: Mostrar alertas stock bajo

### Descripción
Como usuario, quiero ver alertas cuando el stock de materiales esté bajo.

### Criterios de Aceptación
- [ ] Detectar stock bajo (cantidad < mínimo)
- [ ] Mostrar alerta visual (color, ícono)
- [ ] Lista de materiales con stock bajo
- [ ] Enlace a cada material

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Alerta aparece cuando stock < mínimo

### Bloqueos
US-021, US-025

---

## US-014: Ver lista herramientas

### Descripción
Como usuario, quiero ver la lista de herramientas.

### Criterios de Aceptación
- [ ] Mostrar todas las herramientas
- [ ] Mostrar nombre de cada herramienta
- [ ] Mostrar estado actual con color
- [ ] Botón para cambiar estado
- [ ] Mostrar vacío si no hay herramientas

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Lista muestra todas las herramientas

### Bloqueos
US-001

---

## US-015: Cambiar estado herramienta

### Descripción
Como usuario, quiero cambiar el estado de una herramienta.

### Criterios de Aceptación
- [ ] Lista desplegable de estados
- [ ] Seleccionar nuevo estado
- [ ] Guardar cambio
- [ ] Mostrar mensaje de éxito
- [ ] Actualizar visualización

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Estado cambiado correctamente

### Bloqueos
US-014

---

## US-016: Ver historial herramienta

### Descripción
Como usuario, quiero ver el historial de movimientos de una herramienta.

### Criterios de Aceptación
- [ ] Mostrar historial de herramienta
- [ ] Fecha de cada movimiento
- [ ] Tipo de movimiento
- [ ] Cantidad si aplica
- [ ] Ordenar por fecha (más reciente primero)

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Historial muestra movimientos

### Bloqueos
US-014, US-029

---

## US-017: Filtrar por estado

### Descripción
Como usuario, quiero filtrar herramientas por estado.

### Criterios de Aceptación
- [ ] Filtro por estado
- [ ] Lista desplegable de estados
- [ ] Mostrar solo las de ese estado
- [ ] Botón para quitar filtro

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Filtro muestra solo disponibles
- [ ] Filtro muestra solo en uso

### Bloqueos
US-014

---

## US-018: Ver lista materiales

### Descripción
Como usuario, quiero ver la lista de materiales.

### Criterios de Aceptación
- [ ] Mostrar todos los materiales
- [ ] Mostrar nombre y cantidad actual
- [ ] Indicador visual de stock bajo
- [ ] Mostrar vacío si no hay materiales

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Lista muestra todos los materiales

### Bloqueos
US-002

---

## US-019: Registrar entrada material

### Descripción
Como usuario, quiero registrar una entrada de materiales para aumentar el stock.

### Criterios de Aceptación
- [ ] Seleccionar material
- [ ] Ingresar cantidad a agregar
- [ ] Validar cantidad > 0
- [ ] Aumentar cantidad en inventario
- [ ] Registrar movimiento de entrada
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Cantidad aumenta correctamente

### Bloqueos
US-018

---

## US-020: Registrar salida material

### Descripción
Como usuario, quiero registrar una salida de materiales para disminuir el stock.

### Criterios de Aceptación
- [ ] Seleccionar material
- [ ] Ingresar cantidad a retirar
- [ ] Validar que hay suficiente stock
- [ ] Disminuir cantidad en inventario
- [ ] Registrar movimiento de salida
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Cantidad disminuye correctamente

### Bloqueos
US-018

---

## US-021: Definir stock mínimo

### Descripción
Como usuario, quiero definir el stock mínimo de un material.

### Criterios de Aceptación
- [ ] Campo numérico de stock mínimo
- [ ] Validar valor >= 0
- [ ] Guardar valor con material
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Valor guardado correctamente

### Bloqueos
US-002

---

## US-022: Definir stock máximo

### Descripción
Como usuario, quiero definir el stock máximo de un material.

### Criterios de Aceptación
- [ ] Campo numérico de stock máximo
- [ ] Validar valor >= 0
- [ ] Guardar valor con material
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Valor guardado correctamente

### Bloqueos
US-002

---

## US-023: Definir precio compra

### Descripción
Como usuario, quiero definir el precio de compra de un material.

### Criterios de Aceptación
- [ ] Campo numérico de precio compra
- [ ] Validar valor >= 0
- [ ] Guardar valor con material
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Valor guardado correctamente

### Bloqueos
US-002

---

## US-024: Definir precio venta

### Descripción
Como usuario, quiero definir el precio de venta de un material.

### Criterios de Aceptación
- [ ] Campo numérico de precio venta
- [ ] Validar valor >= 0
- [ ] Guardar valor con material
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Valor guardado correctamente

### Bloqueos
US-002

---

## US-025: Ver alerta stock bajo

### Descripción
Como usuario, quiero recibir una alerta cuando el stock de un material esté bajo el mínimo.

### Criterios de Aceptación
- [ ] Comparar cantidad actual con mínimo
- [ ] Mostrar alerta visual cuando stock < mínimo
- [ ] Nombre del material con stock bajo
- [ ] Cantidad actual vs mínimo
- [ ] Enlace para agregar stock

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Alerta aparece cuando stock < mínimo

### Bloqueos
US-021, US-018

---

## US-026: Registrar entrada movimiento

### Descripción
Como usuario, quiero registrar un movimiento de entrada.

### Criterios de Aceptación
- [ ] Seleccionar producto
- [ ] Ingresar cantidad
- [ ] Tipo de movimiento (entrada)
- [ ] Guardar movimiento
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Movimiento guardado

### Bloqueos
US-003

---

## US-027: Registrar salida movimiento

### Descripción
Como usuario, quiero registrar un movimiento de salida (préstamo).

### Criterios de Aceptación
- [ ] Seleccionar producto
- [ ] Ingresar cantidad
- [ ] Tipo de movimiento (salida/préstamo)
- [ ] Guardar movimiento
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Movimiento guardado

### Bloqueos
US-003

---

## US-028: Registrar devolución

### Descripción
Como usuario, quiero registrar una devolución.

### Criterios de Aceptación
- [ ] Seleccionar producto devuelto
- [ ] Registrar movimiento de devolución
- [ ] Actualizar estado de herramienta a disponible
- [ ] Guardar movimiento
- [ ] Mostrar mensaje de éxito

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Movimiento guardado

### Bloqueos
US-003

---

## US-029: Ver historial movimientos

### Descripción
Como usuario, quiero ver el historial de movimientos.

### Criterios de Aceptación
- [ ] Lista de movimientos
- [ ] Fecha de cada movimiento
- [ ] Tipo de movimiento
- [ ] Producto afectado
- [ ] Ordenar por fecha (más reciente primero)
- [ ] Mostrar vacío si no hay movimientos

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Historial muestra movimientos

### Bloqueos
US-026, US-027, US-028

---

## US-030: Agregar nota a movimiento

### Descripción
Como usuario, quiero agregar una nota a un movimiento.

### Criterios de Aceptación
- [ ] Campo de texto para nota
- [ ] Guardar nota con movimiento
- [ ] Mostrar nota en historial
- [ ] Nota opcional

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Nota guardada

### Bloqueos
US-026, US-027, US-028

---

## US-031: Exportar a CSV

### Descripción
Como usuario, quiero exportar el inventario a CSV.

### Criterios de Aceptación
- [ ] Generar archivo CSV
- [ ] Incluir todos los productos
- [ ] Descargar archivo automaticamente
- [ ] Nombre de archivo con fecha

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Archivo se descarga

### Bloqueos
US-003

---

## US-032: Exportar a Excel

### Descripción
Como usuario, quiero exportar el inventario a Excel.

### Criterios de Aceptación
- [ ] Generar archivo Excel (XLS)
- [ ] Incluir todos los productos
- [ ] Descargar archivo automaticamente
- [ ] Nombre de archivo con fecha

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Archivo se descarga

### Bloqueos
US-003

---

## US-033: Iniciar chequeo de inventario

### Descripción
Como técnico del taller, quiero iniciar un chequeo rápido de inventario para verificar que las herramientas están presentes.

### Criterios de Aceptación
- [ ] Mostrar lista de herramientas a chequear
- [ ] Ordenar por ubicación o categoría
- [ ] Contador de progreso (X de Y)
- [ ] Botón para comenzar chequeo completo
- [ ] Botón para filtrar antes de iniciar

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Lista muestra todas las herramientas
- [ ] Contador inicia en 0/total

### Bloqueos
US-014

---

## US-034: Iniciar chequeo por filtro

### Descripción
Como usuario, quiero seleccionar un subconjunto de herramientas para hacer un chequeo más rápido.

### Criterios de Aceptación
- [ ] Opción de filtrar antes de iniciar chequeo
- [ ] Filtro por tipo (herramienta)
- [ ] Filtro por categoría
- [ ] Filtro por ubicación
- [ ] Filtro por estado
- [ ] Ver cantidad de herramientas después de aplicar filtro
- [ ] Botón para iniciar chequeo con filtro aplicado

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Filtro reduce cantidad de herramientas
- [ ] Muestra cantidad filtrada

### Bloqueos
US-033

---

## US-035: Mostrar pregunta de herramienta

### Descripción
Como usuario, quiero que el sistema me pregunte por cada herramienta para hacer el chequeo rápido.

### Criterios de Aceptación
- [ ] Mostrar nombre de la herramienta actual
- [ ] Mostrar ubicación de la herramienta
- [ ] Mostrar categoría
- [ ] Botón "SI" (encontré la herramienta)
- [ ] Botón "NO" (no la encontré)
- [ ] Botón "omitir" para pasar sin responder

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Pregunta muestra nombre correcto
- [ ] Botones son visibles y accesibles

### Bloqueos
US-033

---

## US-035: Registrar respuesta SI/NO

### Descripción
Como usuario, quiero registrar mi respuesta al sistema para cada herramienta.

### Criterios de Aceptación
- [ ] Al presionar "SI": marcar como encontrada
- [ ] Al presionar "NO": marcar como no encontrada
- [ ] Avanzar a siguiente herramienta automáticamente
- [ ] Actualizar contador de progreso
- [ ] Guardar respuesta en memoria temporal

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Respuesta se guarda correctamente
- [ ] Contador avanza

### Bloqueos
US-034

---

## US-036: Mostrar herramientas no encontradas

### Descripción
Como usuario, quiero ver al final del chequeo cuáles herramientas no encontré para tomar acción.

### Criterios de Aceptación
- [ ] Mostrar lista de herramientas con respuesta "NO"
- [ ] Mostrar última ubicación registrada
- [ ] Opción para actualizar ubicación
- [ ] Opción para marcar como perdida
- [ ] Contador de herramientas no encontradas

### Estimación
| Complejidad | 2 |
| Tiempo estimado | 1 hora |

### Ideas de Test
- [ ] Muestra solo las no encontradas
- [ ] Muestra cantidad correcta

### Bloqueos
US-035

---

## US-037: Finalizar chequeo

### Descripción
Como usuario, quiero finalizar el chequeo y ver el resumen.

### Criterios de Aceptación
- [ ] Botón para finalizar
- [ ] Mostrar resumen: encontradas vs no encontradas
- [ ] Porcentaje de éxito
- [ ] Opción para guardar resultado o descartar
- [ ] Mostrar herramientas no encontradas
- [ ] Cerrar sesión de chequeo

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Resumen muestra datos correctos

### Bloqueos
US-036

---

## US-039: Incrementar cantidad rápido

### Descripción
Como usuario, quiero incrementar la cantidad de un material rápidamente usando botones + sin necesidad de abrir un formulario.

### Criterios de Aceptación
- [ ] Botón "+" visible en cada material
- [ ] Al presionar incrementa +1
- [ ] Validar que la cantidad no exceda el stock máximo
- [ ] Mostrar mensaje si alcanza máximo
- [ ] Actualizar cantidad en tiempo real

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Botón + incrementa cantidad
- [ ] Mensaje cuando alcanza máximo

### Bloqueos
US-018

---

## US-040: Decrementar cantidad rápido

### Descripción
Como usuario, quiero decrementar la cantidad de un material rápidamente usando botones - sin necesidad de abrir un formulario.

### Criterios de Aceptación
- [ ] Botón "-" visible en cada material
- [ ] Al presionar decrementa -1
- [ ] Validar que haya suficiente stock
- [ ] No permitir cantidad menor a 0
- [ ] Actualizar cantidad en tiempo real

### Estimación
| Complejidad | 1 |
| Tiempo estimado | 30 minutos |

### Ideas de Test
- [ ] Botón - decrementa cantidad
- [ ] No permite menor a 0

### Bloqueos
US-018

---

| Puntos | Descripción |
|--------|-------------|
| **1** | Tarea trivial, sin cambios de código |
| **2** | Cambio simple, un componente |
| **3** | Múltiples cambios, componente nuevo simple |