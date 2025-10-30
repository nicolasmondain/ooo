# Modern Static Blog

A fast, static blog built with React, TypeScript, Vite, and Spotlight design system. Deployable to GitHub Pages.

## Features

- **GitHub Gists Integration** - Articles automatically fetched from your GitHub Gists
- Markdown articles with GFM support
- Dark mode with theme switching
- Responsive design
- SEO friendly
- Automatic GitHub Pages deployment
- Code splitting for articles
- Random cover images for posts
- TypeScript throughout
- 5-minute cache for API calls

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Catalyst UI + Spotlight components
├── data/
│   ├── articles.json    # Article metadata
│   └── articles/        # Markdown files
├── pages/
│   ├── Home.tsx
│   ├── Article.tsx
│   └── About.tsx
├── lib/                 # Utilities
└── App.tsx
```

## Writing Articles

Articles are automatically loaded from your GitHub Gists. The blog fetches public gists from the configured GitHub username and displays them as blog posts.

### Create a new article:

1. Go to https://gist.github.com
2. Create a new public Gist with a `.md` file
3. Write your article in Markdown
4. Save the Gist
5. The blog will automatically fetch and display it

### Article Properties:

- **Title**: Extracted from filename (e.g., `my-article.md` → "My Article")
- **Slug**: Created from filename (URL-friendly)
- **Excerpt**: From Gist description or first paragraphs
- **Author**: Your GitHub username
- **Date**: Gist's last updated date
- **Read Time**: Auto-calculated from content
- **Tags**: Auto-detected from content keywords
- **Cover Image**: Randomly assigned (deterministic per article)

### Configure GitHub Username:

Edit `src/lib/articles.ts`:

```ts
const GITHUB_USERNAME = 'your-github-username'
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: **GitHub Actions**

3. Update base path in `vite.config.ts`:
   ```ts
   base: process.env.GITHUB_PAGES ? '/your-repo-name/' : '/',
   ```

Your blog will be at: `https://username.github.io/your-repo-name/`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically deploys on every push to master.

### Manual Deployment

```bash
npm run build:gh-pages
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

Set GitHub Pages source to `gh-pages` branch.

### Custom Domain

1. Create `public/CNAME`:
   ```
   yourdomain.com
   ```

2. Update `vite.config.ts`:
   ```ts
   base: '/',
   ```

3. Configure DNS with CNAME record pointing to: `your-username.github.io`

## Customization

### Change blog title

Edit `src/components/spotlight/Header.tsx` and `index.html`

### Update colors

Edit `src/index.css`:
```css
@theme {
  --color-zinc-900: #your-color;
}
```

### Add pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```

## Tech Stack

**Core:** React 19, TypeScript 5.9, Vite 7.1

**Styling:** Tailwind CSS v4, Spotlight Design, next-themes

**Content:** React Router 7, React Markdown, remark-gfm, date-fns

**UI:** @headlessui/react, @heroicons/react, motion

## Configuration

### Path Aliases

Import using `@/`:
```tsx
import { Button } from '@/components/spotlight'
import { getAllArticles } from '@/lib/articles'
```

Configured in `tsconfig.app.json` and `vite.config.ts`.

### Dark Mode

Theme switching via `next-themes`. Toggle in header component.

### Routing

React Router with SPA fallback (`public/404.html`) for GitHub Pages compatibility.

## Available Commands

```bash
npm run dev              # Development server
npm run build            # Production build
npm run build:gh-pages   # Build with GitHub Pages config
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## Content Management

### Draft articles

Mark Gists as secret (not public) to hide them from the blog

### Edit articles

Simply edit the Gist on GitHub. The blog will fetch the updated content automatically (cached for 5 minutes).

### Article order

Sorted by last updated date (newest first).

### Cover Images

Each article gets a randomly assigned cover image from `src/images/photos/`. The selection is deterministic based on the Gist ID, so the same article always displays the same image.

## Troubleshooting

### Blank page after deployment

- Check `base` path in `vite.config.ts` matches repository name
- Check browser console for 404 errors

### Build fails

- Verify Node.js 18+
- Check TypeScript errors: `npm run build`
- Clear and reinstall: `rm -rf node_modules && npm install`

### Images not loading

- Use absolute paths from `public/` folder
- Or use external URLs (Unsplash, etc.)
- Check base path configuration

### 404 on page refresh

The `public/404.html` file handles SPA routing. Ensure it's included in the build.

## Performance

- Images are code-split by Vite
- Each article loads on demand
- Optimized production bundle with minification
- Tree-shaking for unused code

## SEO

Update meta tags in `index.html`:
```html
<title>Your Blog Title</title>
<meta name="description" content="Your description" />
<meta property="og:title" content="Your Blog" />
<meta property="og:image" content="https://..." />
```

## License

MIT
