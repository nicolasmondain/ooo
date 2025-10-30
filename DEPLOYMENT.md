# Deployment Guide for GitHub Pages

This guide will help you deploy your blog to GitHub Pages for free hosting.

## Prerequisites

- A GitHub account
- This repository pushed to GitHub
- GitHub Pages enabled in your repository settings

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys your blog whenever you push to the `master` (or `main`) branch.

### Setup Steps

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Build and deployment", select:
     - Source: **GitHub Actions**

3. **Update the base path:**
   - Open `vite.config.ts`
   - Change `'/ooo/'` to `'/your-repo-name/'` on line 19

4. **Trigger deployment:**
   - Push any change to the `master` branch, or
   - Go to Actions tab → "Deploy to GitHub Pages" → Run workflow

5. **Access your blog:**
   - Your blog will be available at: `https://your-username.github.io/your-repo-name/`
   - It may take a few minutes for the first deployment

## Manual Deployment

If you prefer to deploy manually:

### Option 1: Using gh-pages branch

```bash
# Build for production
npm run build:gh-pages

# Deploy (first time setup)
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

Then in GitHub Settings → Pages:
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)

### Option 2: Push dist folder

```bash
# Build for production
npm run build:gh-pages

# Navigate to dist
cd dist

# Initialize git and push
git init
git add -A
git commit -m 'Deploy'
git push -f git@github.com:username/repo.git master:gh-pages

cd ..
```

## Configuration

### Base Path

The `base` option in `vite.config.ts` determines the base URL:

```ts
base: process.env.GITHUB_PAGES ? '/ooo/' : '/',
```

- For GitHub Pages: `'/repository-name/'`
- For custom domain: `'/'`

### Custom Domain

To use a custom domain:

1. **Create a CNAME file:**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Update `vite.config.ts`:**
   ```ts
   base: '/',
   ```

3. **Configure DNS:**
   - Add a CNAME record pointing to: `your-username.github.io`
   - Or A records for:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

4. **Enable custom domain in GitHub:**
   - Settings → Pages → Custom domain
   - Enter your domain
   - Check "Enforce HTTPS" after verification

## Troubleshooting

### Blank Page After Deployment

- Check that `base` in `vite.config.ts` matches your repository name
- Ensure you're using `BrowserRouter` with the correct basename
- Check browser console for 404 errors

### 404 on Page Refresh

GitHub Pages doesn't support SPA routing by default. Solutions:

1. **Use HashRouter instead of BrowserRouter:**
   ```tsx
   import { HashRouter } from 'react-router-dom'
   // Use HashRouter in App.tsx
   ```

2. **Add a 404.html:**
   Create `public/404.html` that redirects to index.html

3. **Use a custom 404 handler** (requires custom domain)

### Build Fails

- Check Node version (use Node 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### Images Not Loading

- Use absolute paths from `public/` folder
- Or use external URLs (like Unsplash)
- Check base path configuration

## Environment Variables

To use different configurations for different environments:

```ts
// vite.config.ts
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/your-repo/' : '/',
  // ... other config
}))
```

## Build Optimization

The build process automatically:
- Minifies JavaScript and CSS
- Optimizes images
- Tree-shakes unused code
- Generates optimized chunks

To analyze bundle size:

```bash
npm run build -- --mode production
# Check dist/ folder size
du -sh dist
```

## Updating Your Blog

1. **Add a new article:**
   - Add entry to `src/data/articles.json`
   - Create markdown file in `src/data/articles/`

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add new article: Title"
   git push
   ```

3. **Automatic deployment:**
   - GitHub Actions will automatically build and deploy
   - Check the Actions tab for progress

## Deployment Checklist

Before deploying:

- [ ] Update `vite.config.ts` with correct base path
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Check all images load correctly
- [ ] Test all routes work
- [ ] Verify mobile responsiveness
- [ ] Check dark mode works
- [ ] Test article content renders correctly
- [ ] Verify metadata is correct
- [ ] Check for console errors

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html#github-pages)
- [React Router Documentation](https://reactrouter.com/en/main)

---

Happy deploying! 🚀

