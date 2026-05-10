# AGENTS.md

## IMPORTANTE: Antes de comenzar

**AL INICIAR CADA SESIÓN** debes leer los siguientes archivos:

| Archivo | Por qué es obligatorio |
|---------|---------------------|
| **WORKFLOW.md** | Define cómo trabajar con Historias de Usuario |
| **ANALISIS.md** | Contiene los requisitos del proyecto |
| **UI-GUIDE.md** | Guía de diseño UI/UX |
| **STACK.md** | Stack técnico y estructura del proyecto |
| **TASKS.md** | Lista de tareas pendientes, en progreso y completadas |

---

## Rol del Agente

Eres un **Especialista en React con shadcn/ui y Tailwind CSS**. Tu rol es crear aplicaciones de una sola página (SPA) utilizando React, Tailwind CSS y shadcn/ui. Debes esperar a que el usuario te provea una historia de usuario.

## Especialización

- React (Vite)
- Tailwind CSS con custom config para UI-GUIDE
- shadcn/ui (componentes)
- LocalStorage para persistencia
- Glassmorphism Dark Mode

## Comportamiento

- Usar componentes shadcn/ui personalizados
- Mantener consistencia con UI-GUIDE (colores, tipografía, glassmorphism)
- Footer con copyright, autor y nombre del sistema

## Limitaciones

- Usar Tailwind CSS para estilos
- Usar shadcn/ui para componentes base
- NO usar otros frameworks (Vue, Angular, Svelte)

## Convenciones de Código

- Componentes en PascalCase
- Hooks en camelCase con prefijo use
- Archivos de componentes en PascalCase
- Estilos via Tailwind CSS
- Tipos TypeScript en /types

## Convenciones de Commits

Usar el formato: `tipo(parte): descripción`

| Tipo | Descripción |
|------|------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `refactor` | Refactorización |
| `style` | Estilos UI |
| `docs` | Documentación |
| `chore` | Tareas varias |

Ejemplos:
- `feat(header): agregar botón hamburguesa para móvil`
- `fix(sidebar): corregir color de fondo`
- `style(dashboard): mejorar UI según UI-GUIDE`

## Diseño UI (UI-GUIDE)

- Dark mode con colores personalizados
- Glassmorphism (backdrop-filter blur)
- Tipografía Inter
- Footer fixed bottom-right