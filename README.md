# 📝 Modern Static Blog with Spotlight Design

A beautiful, fast, and fully-featured static blog built with React, TypeScript, Vite, and the Spotlight design system from Tailwind UI. Perfect for hosting on GitHub Pages.

![React](https://img.shields.io/badge/React-19.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4) ![Vite](https://img.shields.io/badge/Vite-7.1-646CFF)

## ✨ Features

- 📝 **Markdown Support** - Write articles in Markdown with GFM support
- 🎨 **Spotlight Design** - Beautiful design system from Tailwind UI
- 🌓 **Dark Mode** - Seamless theme switching with next-themes
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Lightning Fast** - Vite for instant dev server and optimized builds
- 🔍 **SEO Friendly** - Meta tags and semantic HTML
- 🚀 **Easy Deployment** - Automatic deployment to GitHub Pages
- 📦 **Code Splitting** - Articles loaded on demand
- 🎯 **TypeScript** - Fully typed for better DX
- ♿ **Accessible** - Built with Headless UI components
- 🖼️ **Photo Gallery** - Beautiful photo grid on homepage
- 📧 **Newsletter Form** - Built-in newsletter signup component
- 💼 **Resume Section** - Showcase your work experience

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see your blog!

## 📂 Project Structure

```
ooo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automatic deployment to GitHub Pages
├── public/
│   ├── 404.html                # SPA routing fallback
│   └── vite.svg
├── src/
│   ├── components/             # Catalyst UI components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── link.tsx            # Integrated with React Router
│   │   └── ...                 # 27+ components
│   ├── data/
│   │   ├── articles.json       # Article metadata
│   │   └── articles/           # Markdown articles
│   │       ├── getting-started-with-react.md
│   │       └── ...
│   ├── lib/
│   │   └── articles.ts         # Article utilities
│   ├── pages/
│   │   ├── Home.tsx            # Blog homepage
│   │   ├── Article.tsx         # Article detail page
│   │   └── About.tsx           # About page
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx
│   └── index.css               # Tailwind CSS v4 config
├── index.html
├── vite.config.ts              # Vite + Tailwind config
├── DEPLOYMENT.md               # Deployment guide
└── package.json
```

## ✍️ Writing Articles

### 1. Add Article Metadata

Edit `src/data/articles.json`:

```json
{
  "id": "my-new-article",
  "title": "My Amazing Article",
  "slug": "my-new-article",
  "excerpt": "A short description of the article",
  "author": "Your Name",
  "date": "2024-03-30",
  "readTime": "5 min read",
  "tags": ["React", "JavaScript"],
  "published": true,
  "coverImage": "https://images.unsplash.com/photo-..."
}
```

### 2. Create the Article Content

Create `src/data/articles/my-new-article.md`:

```markdown
# My Amazing Article

Your content here with **markdown** support!

## Subheading

- Lists
- Code blocks
- Images
- And more!
```

### 3. Deploy

```bash
git add .
git commit -m "Add new article"
git push
```

GitHub Actions will automatically build and deploy your blog! 🎉

---

## 🚢 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: **GitHub Actions**

3. **Update base path in `vite.config.ts`:**
   ```ts
   base: process.env.GITHUB_PAGES ? '/your-repo-name/' : '/',
   ```

4. **Done!** Your blog will be at `https://username.github.io/repo-name/`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🎨 Customization

### Change Colors

Update the theme in `src/index.css`:

```css
@theme {
  --color-primary: #your-color;
}
```

### Add New Pages

1. Create a page component in `src/pages/`
2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in the navbar

### Modify Layout

Edit `src/App.tsx` to change:
- Navigation structure
- Footer content
- Overall layout

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **Spotlight Design** - Professional design system
- **@tailwindcss/vite** - Tailwind Vite plugin
- **next-themes** - Dark mode support

### Routing & Content
- **React Router 7** - Client-side routing
- **React Markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown
- **date-fns** - Date formatting

### UI Components
- **@headlessui/react** - Accessible UI primitives
- **@heroicons/react** - Icon library
- **motion** - Animation library

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [Catalyst Setup](./CATALYST_SETUP.md) - Catalyst UI Kit information
- [Catalyst Docs](https://catalyst.tailwindui.com/docs) - Official Catalyst documentation
- [Tailwind CSS v4](https://tailwindcss.com) - Tailwind documentation
- [Vite Guide](https://vite.dev/guide/) - Vite documentation

## 🚀 Getting Started (Detailed)

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
