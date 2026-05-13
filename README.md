# uFlex Landing Page

Landing page para uFlex, una solucion IoT enfocada en telerehabilitacion y monitoreo clinico de ejercicios mediante sensores inerciales.

## Stack

- Vite
- Tailwind CSS 4
- DaisyUI
- JavaScript modular
- Internacionalizacion con archivos JSON en `src/locales`

## Requisitos

- Node.js 20 o superior
- pnpm

El proyecto fuerza el uso de pnpm desde el script `preinstall`.

## Instalacion

```bash
pnpm install
```

## Scripts

```bash
pnpm dev
```

Inicia el servidor de desarrollo de Vite.

```bash
pnpm build
```

Genera la version de produccion en `dist/`.

```bash
pnpm preview
```

Sirve localmente el build de produccion para revisarlo antes de desplegar.

## Estructura

```text
public/
  images/          Logos, favicons y recursos publicos
src/
  assets/          Imagenes usadas por la landing
  css/             Estilos globales
  js/              Entrada principal y modulos de UI
  locales/         Textos en espanol e ingles
index.html         Marcado principal de la landing
DESIGN.md          Guia visual y tokens de diseno
```

## Idiomas

Los textos se administran desde:

- `src/locales/es.json`
- `src/locales/en.json`

Para cambiar contenido visible, actualiza ambos archivos para mantener consistencia entre idiomas.

## Diseno

La guia de identidad y criterios visuales esta documentada en `DESIGN.md`. Antes de modificar colores, tipografia o componentes principales, revisa ese archivo para mantener coherencia con el sistema de diseno de uFlex.


