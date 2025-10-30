# Complete Blog User Guide

This guide covers everything you need to know about using and customizing your blog.

## Table of Contents

1. [Writing Articles](#writing-articles)
2. [Managing Content](#managing-content)
3. [Customization](#customization)
4. [Adding Features](#adding-features)
5. [Performance Tips](#performance-tips)
6. [SEO Optimization](#seo-optimization)

## Writing Articles

### Article Structure

Every article consists of two parts:

1. **Metadata** (in `articles.json`)
2. **Content** (in `articles/*.md`)

### Creating a New Article

#### Step 1: Add Metadata

Edit `src/data/articles.json`:

```json
{
  "id": "unique-article-id",
  "title": "Your Article Title",
  "slug": "url-friendly-slug",
  "excerpt": "Brief description (150-200 characters)",
  "author": "Author Name",
  "date": "2024-03-30",
  "readTime": "5 min read",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "published": true,
  "coverImage": "https://images.unsplash.com/..."
}
```

**Field Descriptions:**
- `id` - Unique identifier (use slug)
- `title` - Article title (shown in cards and article page)
- `slug` - URL-friendly version (used in `/article/slug`)
- `excerpt` - Short summary (shown on home page)
- `author` - Author name
- `date` - Publication date (YYYY-MM-DD format)
- `readTime` - Estimated reading time
- `tags` - Array of tags (filterable categories)
- `published` - `true` to show, `false` to hide
- `coverImage` - Optional hero image URL

#### Step 2: Write Content

Create `src/data/articles/your-slug.md`:

```markdown
# Your Article Title

Your introduction paragraph goes here.

## Section Heading

Content with **bold**, *italic*, and `code` formatting.

### Subsection

- Bullet points
- Work great
- For lists

1. Numbered lists
2. Also work
3. Perfectly

\```typescript
// Code blocks with syntax highlighting
function hello(name: string) {
  return `Hello, ${name}!`
}
\```

> Blockquotes for callouts or important notes

![Image Alt Text](https://images.unsplash.com/photo-...)

[Links work too](https://example.com)
```

### Markdown Features

The blog supports GitHub Flavored Markdown (GFM):

- **Headings** - `#`, `##`, `###`, etc.
- **Bold** - `**text**`
- **Italic** - `*text*`
- **Code** - `` `inline code` ``
- **Code Blocks** - ` ```language ... ``` `
- **Links** - `[text](url)`
- **Images** - `![alt](url)`
- **Lists** - `- item` or `1. item`
- **Blockquotes** - `> quote`
- **Tables** - GFM table syntax
- **Task Lists** - `- [ ] todo`
- **Strikethrough** - `~~text~~`

### Finding Cover Images

Free image sources:
- [Unsplash](https://unsplash.com) - High quality photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images

Use Unsplash URLs with parameters:
```
https://images.unsplash.com/photo-ID?w=800&auto=format&fit=crop
```

## Managing Content

### Drafts

To save a draft without publishing:

```json
{
  "published": false
}
```

Unpublished articles won't appear on the blog.

### Editing Articles

1. Edit the markdown file or metadata
2. Commit and push changes
3. GitHub Actions automatically rebuilds the site

### Deleting Articles

1. Set `"published": false` in `articles.json`
2. Or remove the entry entirely
3. Optionally delete the `.md` file

### Article Order

Articles are automatically sorted by date (newest first). To change an article's position, update its `date` field.

## Customization

### Change Blog Title

Edit `src/App.tsx`:

```tsx
<NavbarItem href="/" className="text-xl font-bold">
  Your Blog Name
</NavbarItem>
```

And `index.html`:

```html
<title>Your Blog - Description</title>
```

### Update About Page

Edit `src/pages/About.tsx` with your information.

### Customize Colors

Edit `src/index.css`:

```css
@theme {
  --color-primary: #your-color;
  --color-secondary: #another-color;
}
```

### Change Fonts

Update `index.html` to load a different font:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Your+Font" />
```

Then update `src/index.css`:

```css
@theme {
  --font-sans: 'Your Font', sans-serif;
}
```

### Modify Layout

**Home Page Grid:**

Edit `src/pages/Home.tsx`:

```tsx
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
  {/* Adjust column count */}
</div>
```

**Article Width:**

Edit `src/pages/Article.tsx`:

```tsx
<article className="max-w-4xl mx-auto">
  {/* Change max-w-4xl to max-w-6xl for wider */}
</article>
```

## Adding Features

### Add Search

1. Install dependencies:
   ```bash
   npm install fuse.js
   ```

2. Create search component
3. Filter articles based on query

### Add Categories/Tags Page

1. Create `src/pages/Tags.tsx`
2. Use `getAllTags()` from `lib/articles.ts`
3. Add route to `App.tsx`

### Add Comments

Options:
- [Giscus](https://giscus.app) - GitHub Discussions
- [Utterances](https://utteranc.es) - GitHub Issues
- [Disqus](https://disqus.com) - Traditional comments

### Add Analytics

**Google Analytics:**

Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

**Plausible Analytics:**

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Add RSS Feed

1. Install feed generator
2. Generate feed at build time
3. Add link in `<head>`

## Performance Tips

### Optimize Images

- Use WebP format when possible
- Compress images before uploading
- Use appropriate dimensions (max 1200px width)
- Use Unsplash's `w=800` parameter

### Code Splitting

Already implemented! Each article loads separately.

### Lazy Loading

Add lazy loading to images:

```tsx
<img loading="lazy" src="..." alt="..." />
```

### Reduce Bundle Size

Check bundle size:

```bash
npm run build
# Check the size warnings
```

Consider:
- Removing unused Catalyst components
- Using dynamic imports for heavy components

## SEO Optimization

### Meta Tags

Update `index.html` with proper meta tags:

```html
<meta name="description" content="Your blog description" />
<meta name="keywords" content="react, blog, web development" />
<meta property="og:title" content="Your Blog" />
<meta property="og:description" content="Description" />
<meta property="og:image" content="https://..." />
<meta name="twitter:card" content="summary_large_image" />
```

### Per-Article SEO

Create a component to update meta tags per article using React Helmet or similar.

### Sitemap

Generate `sitemap.xml` during build:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <changefreq>daily</changefreq>
  </url>
  <!-- Add article URLs -->
</urlset>
```

### robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## Best Practices

### Content

- Write concise, scannable content
- Use descriptive headings
- Include code examples when relevant
- Add images to break up text
- Keep excerpts under 200 characters

### Code Blocks

Always specify the language:

\```typescript
// Your code
\```

### Links

- Use descriptive link text
- Prefer HTTPS URLs
- Check links regularly

### Images

- Always include alt text
- Use descriptive filenames
- Optimize before uploading

### Tags

- Use 2-5 tags per article
- Be consistent with tag names
- Use proper capitalization

## Troubleshooting

### Article Not Showing

- Check `"published": true` in JSON
- Verify slug matches filename
- Check for JSON syntax errors

### Styling Issues

- Clear browser cache
- Rebuild: `npm run build`
- Check Tailwind class names

### Routing Problems

- Verify base path in `vite.config.ts`
- Check router configuration
- Test 404 fallback

### Build Errors

- Check TypeScript errors: `npm run build`
- Verify all imports are correct
- Check markdown syntax

## Getting Help

- [GitHub Issues](https://github.com/your-username/repo/issues)
- [Catalyst Docs](https://catalyst.tailwindui.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Vite Docs](https://vite.dev)

---

Happy blogging! 📝✨

