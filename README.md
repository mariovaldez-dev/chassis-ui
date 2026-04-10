# synthetix-ui

Librería de componentes UI para React, estilo [shadcn/ui](https://ui.shadcn.com/): los componentes se copian directamente a tu proyecto via CLI o se instalan como paquete npm.

**Scope npm:** `@synthetix-ui`

| | |
|---|---|
| 📦 npm | `npm install @synthetix-ui/core` |
| 🎨 Showcase | https://playground-theta-bay.vercel.app |
| 📖 Docs | https://synthetix-ui-docs.vercel.app |

---

## Instalación rápida

```bash
npm install @synthetix-ui/core
```

O copia componentes individuales a tu proyecto:

```bash
npx @synthetix-ui add button
```

---

## Requisitos (desarrollo)

- Node.js >= 18
- pnpm >= 10

---

## Primeros pasos

```bash
# 1. Clonar e instalar dependencias
git clone https://github.com/mariovaldez-dev/synthetix-ui.git
cd synthetix-ui
pnpm install

# 2. Build de todos los paquetes
pnpm build
```

---

## Desarrollo

### Levantar todo en paralelo

```bash
pnpm dev
```

Esto arranca en modo watch:
- **Playground** → http://localhost:5173
- **Docs** → http://localhost:3000
- **Storybook** → http://localhost:6006

### Levantar solo lo que necesitas

| App | Comando | URL |
|---|---|---|
| Playground (sandbox Vite) | `pnpm --filter @synthetix-ui/playground dev` | http://localhost:5173 |
| Sitio de documentación | `pnpm --filter @synthetix-ui/docs dev` | http://localhost:3000 |
| Storybook | `pnpm --filter @synthetix-ui/storybook dev` | http://localhost:6006 |

### Iterar sobre un paquete

Abre dos terminales:

```bash
# Terminal 1 — watch del paquete
pnpm --filter @synthetix-ui/core dev

# Terminal 2 — app que lo consume
pnpm --filter @synthetix-ui/playground dev
```

---

## Scripts disponibles

```bash
pnpm build         # Build de todos los paquetes y apps
pnpm dev           # Watch mode + todas las apps en paralelo
pnpm test          # Tests con Vitest
pnpm lint          # ESLint en todos los paquetes
pnpm typecheck     # TypeScript en modo noEmit
```

### Por paquete específico

```bash
pnpm --filter @synthetix-ui/core build
pnpm --filter @synthetix-ui/core test
pnpm --filter @synthetix-ui/core lint
```

---

## Tests

```bash
# Todos los tests
pnpm test

# Solo un paquete
pnpm --filter @synthetix-ui/core test

# Watch mode
pnpm --filter @synthetix-ui/core test -- --watch
```

---

## CLI

Después del build, puedes usar el CLI para copiar componentes a tu proyecto:

```bash
# Ver componentes disponibles
node packages/cli/dist/index.js list

# Añadir un componente
node packages/cli/dist/index.js add button

# Añadir a un directorio específico
node packages/cli/dist/index.js add button --out ./src/components/ui

# Una vez publicado en npm
npx @synthetix-ui add button
```

---

## Estructura del monorepo

```
synthetix-ui/
├── apps/
│   ├── docs/          # Sitio de documentación (Next.js 15)
│   ├── storybook/     # Catálogo visual de componentes
│   └── playground/    # Sandbox de desarrollo (Vite)
├── packages/
│   ├── core/          # Componentes: Button, Input, Card, Dialog...
│   ├── tokens/        # Design tokens (colores, tipografía, espaciado)
│   ├── utils/         # cn() y helpers
│   ├── hooks/         # useMediaQuery, useDisclosure, useFocusTrap
│   ├── icons/         # SVGs como componentes React
	│   ├── cli/           # npx @synthetix-ui add <componente>
│   └── tailwind-preset/ # Preset de Tailwind con los tokens
└── tooling/
    ├── tsconfig/      # Configuraciones TypeScript compartidas
    ├── eslint-config/ # ESLint flat config v9
    └── prettier-config/ # Prettier con tailwindcss plugin
```

---

## Componentes disponibles

| Componente | Descripción |
|---|---|
| `Button` | Botón con variantes, tamaños y estado de carga |
| `Input` | Campo de texto con label, error y elementos laterales |
| `Textarea` | Texto multilínea con auto-resize y contador |
| `Select` | Select nativo con label y error |
| `Checkbox` | Checkbox con estado indeterminado |
| `Switch` | Toggle booleano accesible |
| `Card` | Contenedor con Header, Body y Footer |
| `Badge` | Etiqueta compacta de estado |
| `Spinner` | Indicador de carga |
| `Tooltip` | Etiqueta flotante con delay y 4 posiciones |
| `Accordion` | Secciones expandibles (individual o múltiple) |
| `Dialog` | Modal accesible con trampa de foco |
| `Toast` / `Toaster` | Notificaciones globales sin Context |

---

## Publicar versiones

Este proyecto usa [Changesets](https://github.com/changesets/changesets) para versionado.

```bash
# 1. Describir el cambio
pnpm changeset

# 2. Actualizar versiones en package.json
pnpm version-packages

# 3. Publicar a npm (requiere NPM_TOKEN)
pnpm release
```

En CI/CD, el workflow `release.yml` hace esto automáticamente via PR al hacer push a `main`.

---

## CI/CD

| Workflow | Trigger | Qué hace |
|---|---|---|
| `ci.yml` | PR / push a main | Build → Lint → Typecheck → Test |
| `release.yml` | Push a main | Crea PR de versiones o publica a npm |

Para publicar a npm se necesita el secret `NPM_TOKEN` en el repositorio de GitHub.

---

## Stack

- **pnpm** + **Turborepo** — monorepo y orquestación
- **TypeScript** strict — lenguaje principal
- **React 18** — framework de componentes
- **Tailwind CSS** — estilos utilitarios
- **CVA** — variantes de componentes
- **tsup** — bundler (ESM + CJS + tipos)
- **Vitest** + **Testing Library** — tests
- **Storybook 8** — documentación visual
- **Next.js 15** — sitio de documentación
- **Changesets** — versionado y publicación
