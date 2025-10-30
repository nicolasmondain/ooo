# 🚀 Quick Start Guide

Get your blog running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` - Your blog is running! 🎉

## Step 3: Add Your First Article

### Edit `src/data/articles.json`

Add your article metadata:

```json
{
  "id": "my-first-post",
  "title": "My First Blog Post",
  "slug": "my-first-post",
  "excerpt": "This is my very first post on my new blog!",
  "author": "Your Name",
  "date": "2024-03-30",
  "readTime": "3 min read",
  "tags": ["Personal", "Welcome"],
  "published": true
}
```

### Create `src/data/articles/my-first-post.md`

```markdown
# My First Blog Post

Welcome to my blog! This is my first post.

## Why I Started This Blog

I wanted a place to share my thoughts and ideas...

## What to Expect

You can expect articles about:
- Web development
- Technology
- And more!

Thanks for reading! 🚀
```

Refresh your browser - your article appears!

## Step 4: Customize

### Change Blog Title

Edit `src/App.tsx` line 11:

```tsx
<NavbarItem href="/" className="text-xl font-bold">
  My Awesome Blog  {/* Change this */}
</NavbarItem>
```

### Update About Page

Edit `src/pages/About.tsx` with your information.

## Step 5: Deploy to GitHub Pages

### 1. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M master
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin master
```

### 2. Update Base Path

Edit `vite.config.ts` line 19:

```ts
base: process.env.GITHUB_PAGES ? '/YOUR-REPO-NAME/' : '/',
```

### 3. Enable GitHub Pages

- Go to your repository on GitHub
- Settings → Pages
- Source: **GitHub Actions**

### 4. Push Changes

```bash
git add vite.config.ts
git commit -m "Configure for GitHub Pages"
git push
```

Wait 2-3 minutes, then visit:
`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## ✅ You're Done!

Your blog is now live on the internet! 🎉

## Next Steps

- [Read the full README](./README.md)
- [Learn about deployment](./DEPLOYMENT.md)
- [Complete blog guide](./BLOG_GUIDE.md)
- [Customize your blog](#customization-tips)

## Customization Tips

### Colors

Edit `src/index.css`:

```css
@theme {
  --color-blue-600: #your-color;
}
```

### Fonts

Change Inter to another font in `index.html` and `src/index.css`.

### Layout

- Home page: `src/pages/Home.tsx`
- Article page: `src/pages/Article.tsx`
- Navigation: `src/App.tsx`

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build
npm run build:gh-pages   # Build with GitHub Pages config

# Code Quality
npm run lint             # Run linter
```

## Getting Help

- 📖 [Full Documentation](./README.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 📝 [Writing Guide](./BLOG_GUIDE.md)
- 💡 [Catalyst Docs](https://catalyst.tailwindui.com/docs)

## Tips

1. **Write regularly** - Consistency is key
2. **Use good images** - Unsplash is your friend
3. **Keep it simple** - Focus on content
4. **Test locally** - Always preview before deploying
5. **Commit often** - Small commits are better

Happy blogging! 📝✨

