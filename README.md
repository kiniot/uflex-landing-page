# uFlex Landing Page

<div align="center">
  <img src="https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/daisyUI-5000CA?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI" />
  <img src="https://img.shields.io/badge/pnpm-%3E%3D10.16-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  <br />
  <img src="https://img.shields.io/badge/Localization-i18n-blue?style=flat-square" alt="i18n" />
  <img src="https://img.shields.io/badge/Platform-IoT_Marketing-orange?style=flat-square" alt="IoT Marketing" />
  <img src="https://img.shields.io/badge/Language-Bilingual-green?style=flat-square" alt="Bilingual" />
</div>

---

Marketing landing page for uFlex, a tele-rehabilitation and clinical IoT product by KinIoT. This project is built as a static frontend with Vite, Tailwind CSS v4, and DaisyUI, and includes bilingual content in English and Spanish.

## Overview

The site is designed to present uFlex as a precise rehabilitation solution for physiotherapists, clinics, and innovation teams. It combines product messaging, technical context, testimonials, pricing, FAQ content, and a contact form in a single-page experience.

## Tech Stack

- Vite
- Tailwind CSS v4
- DaisyUI
- Vanilla JavaScript
- JSON-based localization

## Getting Started

This project uses `pnpm`. The repository enforces it during installation.

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

## Project Structure

```text
.
├── index.html
├── public/
│   ├── images/
│   └── ...
├── src/
│   ├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── modules/i18n/
│   └── locales/
│       ├── en.json
│       └── es.json
├── DESIGN.md
├── package.json
└── vite.config.js
```

## Localization

The landing page supports English and Spanish.

- Translation files are stored in `src/locales/en.json` and `src/locales/es.json`.
- Language selection logic lives in `src/js/modules/i18n/`.
- The selected language is persisted in `localStorage` using the `lang` key.

## Styling and Design

- Global styles and theme tokens are defined in `src/css/style.css`.
- Tailwind CSS and DaisyUI are used to provide the visual system and utility classes.
- Brand and UX guidance is documented in `DESIGN.md`.

## Content Notes

Most page content is rendered from the translation files, which makes copy updates straightforward without changing layout logic. Static media such as product images, testimonials, icons, and branding assets live under `public/` and `src/assets/`.

## Available Scripts

- `pnpm dev`: Run the local development server.
- `pnpm build`: Generate the production build in `dist/`.
- `pnpm preview`: Serve the built app locally for verification.

## Deployment

The project builds to the `dist/` directory and can be deployed to any static hosting provider that supports Vite output.

## Notes

- `node_modules/` and `dist/` may exist locally, but only source files should be considered authoritative.
- If you update product messaging, keep English and Spanish locale files in sync.
