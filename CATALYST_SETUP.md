# Catalyst UI Kit Setup Guide

## ✅ Configuration Complete

Your project has been successfully configured with the [Catalyst UI Kit](https://catalyst.tailwindui.com/docs) from Tailwind CSS.

## 📦 Installed Dependencies

The following packages have been installed:

- `tailwindcss@4.1.16` - Latest version of Tailwind CSS
- `@headlessui/react` - Unstyled, accessible UI components
- `motion` - Animation library for React
- `clsx` - Utility for constructing className strings
- `@heroicons/react` - Beautiful hand-crafted SVG icons
- `autoprefixer` - PostCSS plugin for vendor prefixes

## 🎨 Configuration Files

### CSS Configuration (`src/index.css`)

The main CSS file has been updated to use Tailwind CSS v4 with the Inter font:

```css
@import "tailwindcss";

@theme {
  --font-sans: Inter, sans-serif;
  --font-sans--font-feature-settings: 'cv11';
}
```

### Inter Font (`index.html`)

The Inter font is loaded from CDN in your HTML file.

### Path Aliases

The project is configured with `@/` path aliases for cleaner imports:

- `tsconfig.app.json` - TypeScript path configuration
- `vite.config.ts` - Vite resolver configuration

You can now import like this:

```tsx
import { Link } from '@/components'
import { Button } from '@/components/button'
```

## 📁 Project Structure

```
src/
├── components/
│   ├── link.tsx         # Basic Link component (Catalyst)
│   └── index.ts         # Component exports
├── App.tsx              # Updated with Tailwind CSS demo
├── main.tsx
└── index.css            # Tailwind CSS configuration
```

## 🚀 Getting Started

### 1. Download Catalyst Components

To add Catalyst components to your project:

1. Go to [Catalyst UI Kit](https://catalyst.tailwindui.com/docs)
2. Download the component files (requires Tailwind Plus account)
3. Copy the TypeScript components from the downloaded kit
4. Place them in `src/components/`
5. Export them from `src/components/index.ts`

### 2. Example: Adding a Button Component

After downloading Catalyst components:

1. Copy `button.tsx` to `src/components/button.tsx`
2. Add to `src/components/index.ts`:
   ```tsx
   export { Button } from './button'
   ```
3. Use in your app:
   ```tsx
   import { Button } from '@/components'
   
   function App() {
     return <Button>Click me</Button>
   }
   ```

### 3. Using Heroicons

Import icons based on the component you're using:

**For most components (16×16 icons):**
```tsx
import { PlusIcon } from '@heroicons/react/16/solid'
import { Button } from '@/components'

<Button>
  <PlusIcon />
  Add item
</Button>
```

**For Navbar/Sidebar (20×20 icons):**
```tsx
import { HomeIcon } from '@heroicons/react/20/solid'
import { SidebarItem } from '@/components/sidebar'

<SidebarItem href="/home">
  <HomeIcon />
  Home
</SidebarItem>
```

## 🔗 Router Integration

The `Link` component in `src/components/link.tsx` currently renders standard `<a>` elements.

### React Router

```tsx
import * as Headless from '@headlessui/react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <RouterLink {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
```

### Wouter

```tsx
import * as Headless from '@headlessui/react'
import { Link as WouterLink } from 'wouter'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <WouterLink href={props.href} {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
```

## 🎯 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📚 Resources

- [Catalyst Documentation](https://catalyst.tailwindui.com/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Headless UI Documentation](https://headlessui.com)
- [Heroicons](https://heroicons.com)

## 💡 Tips

1. **Tailwind v4 Changes**: This project uses Tailwind CSS v4, which uses `@import` and `@theme` instead of a config file.

2. **Component Customization**: Catalyst components are meant to be copied into your project and customized. Don't hesitate to modify them to fit your needs.

3. **Dark Mode**: Tailwind's dark mode is enabled by default. Use `dark:` prefix for dark mode styles.

4. **Path Aliases**: Always use `@/` imports for cleaner, more maintainable code.

## 🆘 Troubleshooting

### Build Errors

If you encounter build errors after adding Catalyst components:

1. Check that all imports are correct
2. Verify TypeScript types are properly imported
3. Make sure you've exported new components from `src/components/index.ts`

### Tailwind Styles Not Working

1. Verify `@import "tailwindcss"` is in `src/index.css`
2. Check that `src/index.css` is imported in `src/main.tsx`
3. Make sure you're using valid Tailwind classes

### Path Alias Issues

If `@/` imports aren't working:

1. Restart your TypeScript server in your IDE
2. Check `tsconfig.app.json` has the correct `paths` configuration
3. Verify `vite.config.ts` has the alias resolver

---

**Happy coding! 🚀**

