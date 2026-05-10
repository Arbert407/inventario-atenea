# WORKFLOW.md

## Flujo de Trabajo con Historias de Usuario

Este documento define cómo trabajar con las Historias de Usuario (US) en el proyecto.

---

## Proceso de Desarrollo por US

### 1. Recepción de US

Cuando se asigne una US, esta debe incluir:
- **Título** de la historia
- **Descripción** (Como usuario quiero...)
- **Criterios de aceptación** (Given/When/Then)

### 2. Revisión Previa

Antes de implementar, el agente revisará:

| Archivo | Propósito |
|---------|----------|
| **ANALISIS.md** | Requisitos y reglas del negocio |
| **STACK.md** | Tecnologías y herramientas |
| **UI-GUIDE.md** | Guía de diseño UI/UX |
| **Código existente** | Para no duplicar lógica |

### 3. Desarrollo

```
1. Leer y confirmar comprensión de la US
2. Revisar código existente del proyecto
3. Implementar según criterios de aceptación
4. Agregar ideas de test en TASKS.md
5. Verificar según STACK.md
```

### 4. Entregable

El agente entregará:
- Archivos creados/modificados
- Criterios de aceptación cumplidos
- Ideas de test en TASKS.md
- Notas sobre decisiones de diseño

---

## Estado de la US

| Estado | Descripción |
|--------|-------------|
| **Pendiente** | US asignada pero no iniciada |
| **En Análisis** | Entendiendo requisitos |
| **En Desarrollo** | Implementando |
| **En Review** | Esperando feedback |
| **Completada** | Aprobada |

---

## Formato de US (Referencia)

```markdown
# US-001: [Título]

## Descripción
Como [tipo de usuario], quiero [funcionalidad] para [beneficio].

## Criterios de Aceptación
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

## Ideas de Test
- [ ] Idea de test 1
- [ ] Idea de test 2

## Notas Técnicas
[Decisiones de implementación]

## Bloqueos
[Dependencias o issues bloqueantes]
```