# React + TypeScript + Vite + Catalyst UI Kit

This project uses React, TypeScript, and Vite with the [Catalyst UI Kit](https://catalyst.tailwindui.com/docs) from Tailwind CSS.

## 🎨 Catalyst UI Kit

This project is configured with Catalyst, a beautiful component system built on Tailwind CSS v4 and Headless UI. The following dependencies are included:

- **@headlessui/react** - Unstyled, accessible UI components
- **motion** - Animation library for React
- **clsx** - Utility for constructing className strings
- **@heroicons/react** - Beautiful hand-crafted SVG icons
- **tailwindcss v4** - Latest version of Tailwind CSS

### Adding Catalyst Components

To add Catalyst components to your project:

1. Download the [Catalyst UI Kit](https://catalyst.tailwindui.com/docs) (requires Tailwind Plus account)
2. Copy components from the downloaded kit into `src/components/`
3. Export them from `src/components/index.ts`

### Using Catalyst Components

The project includes a basic `Link` component at `src/components/link.tsx`. As you add more Catalyst components, follow the same pattern.

### Routing Integration

The `Link` component currently renders standard `<a>` elements. To integrate with a routing library:

- **React Router**: Update `src/components/link.tsx` to use `<RouterLink>`
- **Wouter**: Update to use wouter's `Link` component
- **TanStack Router**: Update to use TanStack's `Link` component

See [Catalyst's documentation](https://catalyst.tailwindui.com/docs) for integration examples.

---

## 🚀 Getting Started

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
