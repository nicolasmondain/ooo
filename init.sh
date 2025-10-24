#!/usr/bin/env bash
set -euo pipefail

# This script creates or updates your Astro+Tailwind blog in the "ooo" folder.
# It works whether you run it from the repo root (named "ooo") or from its parent directory.

# Detect base folder: "." if you're already inside "ooo"; otherwise "ooo"
if [ "$(basename "$PWD")" = "ooo" ]; then
  BASE="."
else
  BASE="ooo"
  mkdir -p "$BASE"
fi

echo "Using base directory: $BASE"

mkdir -p "$BASE"/{public,src/{content/posts,content,layouts,pages/{posts,tags},styles},.github/workflows}

# package.json
cat > "$BASE/package.json" <<'EOF'
{
  "name": "ooo",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "astro": "^4.0.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.10",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  }
}
EOF

# astro.config.mjs
cat > "$BASE/astro.config.mjs" <<'EOF'
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nicolasmondain.github.io/ooo',
  base: '/ooo',
  integrations: [
    tailwind(),
    sitemap()
  ],
  markdown: {
    smartypants: true
  }
});
EOF

# tailwind.config.cjs
cat > "$BASE/tailwind.config.cjs" <<'EOF'
/* eslint-env node */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0f172a'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')]
};
EOF

# postcss.config.cjs
cat > "$BASE/postcss.config.cjs" <<'EOF'
/* eslint-env node */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
EOF

# tsconfig.json
cat > "$BASE/tsconfig.json" <<'EOF'
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
EOF

# src/env.d.ts
cat > "$BASE/src/env.d.ts" <<'EOF'
/// <reference types="astro/client" />
EOF

# styles
cat > "$BASE/src/styles/tailwind.css" <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

.prose img {
  @apply rounded-lg;
}

.prose a {
  @apply text-blue-600 no-underline hover:underline;
}

html {
  color-scheme: light dark;
}
EOF

# content collections config
cat > "$BASE/src/content/config.ts" <<'EOF'
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional()
    })
});

export const collections = { posts };
EOF

# layouts
cat > "$BASE/src/layouts/BaseLayout.astro" <<'EOF'
---
export interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const { title = 'ooo', description = 'out of office', ogImage } = Astro.props;
const site = import.meta.env.SITE;
const canonical = new URL(Astro.url.pathname, site).toString();
const base = import.meta.env.BASE_URL;
---

<!doctype html>
<html lang="en" class="h-full">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <meta property="og:site_name" content="ooo" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    {ogImage && <meta property="og:image" content={ogImage} />}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {ogImage && <meta name="twitter:image" content={ogImage} />}

    <title>{title}</title>

    <link rel="stylesheet" href={`${base}styles/tailwind.css`} />
  </head>
  <body class="min-h-full bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
    <header class="border-b border-slate-200/70 dark:border-slate-700/50">
      <div class="mx-auto max-w-3xl px-4 py-6 flex items-center justify-between">
        <a href={base} class="font-semibold tracking-tight">ooo</a>
        <nav class="space-x-4">
          <a href={`${base}posts`} class="hover:underline">Blog</a>
          <a href={`${base}tags`} class="hover:underline">Tags</a>
          <a href={`${base}rss.xml`} class="hover:underline">RSS</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 py-10">
      <slot />
    </main>

    <footer class="border-t border-slate-200/70 dark:border-slate-700/50">
      <div class="mx-auto max-w-3xl px-4 py-8 text-sm text-slate-500">
        © {new Date().getFullYear()} — ooo
      </div>
    </footer>
  </body>
</html>
EOF

cat > "$BASE/src/layouts/PostLayout.astro" <<'EOF'
---
import BaseLayout from './BaseLayout.astro';
import type { CollectionEntry } from 'astro:content';

export interface Props {
  post: CollectionEntry<'posts'>;
}

const { post } = Astro.props;
const { data, slug } = post;

const site = import.meta.env.SITE;
const canonical = new URL(`${import.meta.env.BASE_URL}posts/${slug}/`, site).toString();
const title = `${data.title} • ooo`;
const description = data.description;
const dateISO = data.pubDate.toISOString();
const updatedISO = data.updatedDate ? data.updatedDate.toISOString() : undefined;
---

<BaseLayout title={title} description={description}>
  <article class="prose prose-slate dark:prose-invert max-w-none">
    <header class="not-prose mb-6">
      <h1 class="text-3xl font-bold tracking-tight">{data.title}</h1>
      <p class="text-sm text-slate-500">
        <time datetime={dateISO}>{data.pubDate.toDateString()}</time>
        {data.updatedDate && <> • Updated <time datetime={updatedISO}>{data.updatedDate.toDateString()}</time></>}
      </p>
      {data.tags.length > 0 && (
        <ul class="mt-2 flex flex-wrap gap-2">
          {data.tags.map((t) => (
            <li class="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              <a href={`${import.meta.env.BASE_URL}tags/${encodeURIComponent(t)}/`}>#{t}</a>
            </li>
          ))}
        </ul>
      )}
    </header>

    <slot />

    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description,
        datePublished: dateISO,
        dateModified: updatedISO ?? dateISO,
        author: { '@type': 'Person', name: 'ooo' },
        mainEntityOfPage: canonical,
        url: canonical
      })}
    </script>
  </article>
</BaseLayout>
EOF

# pages
cat > "$BASE/src/pages/index.astro" <<'EOF'
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('posts', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 10);

const base = import.meta.env.BASE_URL;
---

<BaseLayout>
  <section class="mb-10">
    <h1 class="text-3xl font-bold tracking-tight">ooo</h1>
    <p class="mt-2 text-slate-600 dark:text-slate-400">out of office</p>
  </section>

  <section>
    <h2 class="sr-only">Latest posts</h2>
    <ul class="space-y-6">
      {posts.map(({ slug, data }) => (
        <li class="border-b border-slate-200/70 dark:border-slate-700/50 pb-6">
          <a href={`${base}posts/${slug}/`} class="text-xl font-semibold hover:underline">
            {data.title}
          </a>
          <div class="text-sm text-slate-500">
            <time datetime={data.pubDate.toISOString()}>{data.pubDate.toDateString()}</time>
          </div>
          <p class="mt-2 text-slate-700 dark:text-slate-300">{data.description}</p>
        </li>
      ))}
    </ul>
    <div class="mt-8">
      <a class="hover:underline" href={`${base}posts`}>All posts →</a>
    </div>
  </section>
</BaseLayout>
EOF

# posts redirect index
cat > "$BASE/src/pages/posts/index.astro" <<'EOF'
---
const base = import.meta.env.BASE_URL;
return Astro.redirect(`${base}posts/1`);
---
EOF

# posts paginated list
cat > "$BASE/src/pages/posts/[...page].astro" <<'EOF'
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths({ paginate }) {
  const allPosts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return paginate(allPosts, { pageSize: 10 });
}

const { page } = Astro.props;
const base = import.meta.env.BASE_URL;
---

<BaseLayout title={`Posts — Page ${page.currentPage} • ooo`} description="All posts">
  <h1 class="text-2xl font-bold tracking-tight mb-6">All posts</h1>
  <ul class="space-y-6">
    {page.data.map(({ slug, data }) => (
      <li class="border-b border-slate-200/70 dark:border-slate-700/50 pb-6">
        <a href={`${base}posts/${slug}/`} class="text-xl font-semibold hover:underline">
          {data.title}
        </a>
        <div class="text-sm text-slate-500">
          <time datetime={data.pubDate.toISOString()}>{data.pubDate.toDateString()}</time>
        </div>
        <p class="mt-2 text-slate-700 dark:text-slate-300">{data.description}</p>
      </li>
    ))}
  </ul>

  <nav class="mt-8 flex items-center justify-between">
    {page.url.prev && <a class="hover:underline" href={page.url.prev}>← Newer</a>}
    <span class="text-sm text-slate-500">Page {page.currentPage} of {page.lastPage}</span>
    {page.url.next && <a class="hover:underline" href={page.url.next}>Older →</a>}
  </nav>
</BaseLayout>
EOF

# post page
cat > "$BASE/src/pages/posts/[slug].astro" <<'EOF'
---
import PostLayout from '@/layouts/PostLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout post={post}>
  <Content />
</PostLayout>
EOF

# tags index
cat > "$BASE/src/pages/tags/index.astro" <<'EOF'
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => !data.draft);
const tagMap = new Map<string, number>();
for (const p of posts) {
  for (const t of p.data.tags) {
    tagMap.set(t, (tagMap.get(t) ?? 0) + 1);
  }
}
const tags = Array.from(tagMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
const base = import.meta.env.BASE_URL;
---

<BaseLayout title="Tags • ooo" description="Browse posts by tag">
  <h1 class="text-2xl font-bold tracking-tight mb-6">Tags</h1>
  <ul class="flex flex-wrap gap-3">
    {tags.map(([tag, count]) => (
      <li>
        <a class="rounded bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm hover:underline" href={`${base}tags/${encodeURIComponent(tag)}/`}>
          #{tag} <span class="text-slate-500">({count})</span>
        </a>
      </li>
    ))}
  </ul>
</BaseLayout>
EOF

# tag page
cat > "$BASE/src/pages/tags/[tag].astro" <<'EOF'
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const tags = new Set<string>();
  posts.forEach((p) => p.data.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).map((tag) => ({ params: { tag } }));
}

const { tag } = Astro.params;
const posts = (await getCollection('posts', ({ data }) => !data.draft))
  .filter((p) => p.data.tags.includes(tag!))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

const base = import.meta.env.BASE_URL;
---

<BaseLayout title={`#${tag} • ooo`} description={`Posts tagged ${tag}`}>
  <h1 class="text-2xl font-bold tracking-tight mb-6">#{tag}</h1>
  <ul class="space-y-6">
    {posts.map(({ slug, data }) => (
      <li class="border-b border-slate-200/70 dark:border-slate-700/50 pb-6">
        <a href={`${base}posts/${slug}/`} class="text-xl font-semibold hover:underline">
          {data.title}
        </a>
        <div class="text-sm text-slate-500">
          <time datetime={data.pubDate.toISOString()}>{data.pubDate.toDateString()}</time>
        </div>
        <p class="mt-2 text-slate-700 dark:text-slate-300">{data.description}</p>
      </li>
    ))}
  </ul>
</BaseLayout>
EOF

# RSS
cat > "$BASE/src/pages/rss.xml.ts" <<'EOF'
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'ooo',
    description: 'out of office',
    site: context.site!,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: posts.map((post) => ({
      link: `${import.meta.env.BASE_URL}posts/${post.slug}/`,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate
    }))
  });
}
EOF

# public assets
cat > "$BASE/public/robots.txt" <<'EOF'
User-agent: *
Allow: /

Sitemap: https://nicolasmondain.github.io/ooo/sitemap-index.xml
EOF

cat > "$BASE/public/favicon.svg" <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0f172a"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial" font-size="28" fill="white">ooo</text>
</svg>
EOF

# example post
cat > "$BASE/src/content/posts/hello-world.md" <<'EOF'
---
title: Hello, world
description: Kicking off the blog.
pubDate: 2025-01-01
draft: false
tags:
  - intro
---

Welcome to ooo — out of office.

This is your first post. Edit this file or add new ones under `src/content/posts`.

- Write Markdown as usual.
- Add `draft: true` to keep a post unpublished.
- Use `tags` for discoverability and SEO-friendly tag pages.
EOF

# .gitignore
cat > "$BASE/.gitignore" <<'EOF'
# dependencies
node_modules

# build output
dist
.cache
.astro

# OS / editor
.DS_Store
*.log

# env
.env
.env.*
EOF

# GitHub Actions for Pages
cat > "$BASE/.github/workflows/deploy.yml" <<'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# README
cat > "$BASE/README.md" <<'EOF'
# ooo — out of office

Markdown-first blog powered by Astro + Tailwind, deployed to GitHub Pages.

## Quick start

1. Install dependencies:
   - npm: `npm install`

2. Start dev server:
   - `npm run dev`
   - Local dev will be at http://localhost:4321

3. Build:
   - `npm run build`

4. Preview:
   - `npm run preview`

## Writing posts

- Add Markdown files to `src/content/posts/*.md`
- Frontmatter schema:
  - `title: string`
  - `description: string (<=160 chars)`
  - `pubDate: date` (e.g., `2025-01-20`)
  - `updatedDate: date` (optional)
  - `draft: boolean` (default `false`)
  - `tags: string[]` (default `[]`)
  - `heroImage: image` (optional)
- Draft posts (`draft: true`) are excluded from the build, RSS, and sitemap.

## SEO

- Canonical: configured via `astro.config.mjs` with `site: https://nicolasmondain.github.io/ooo` and `base: /ooo`
- Automatic sitemap: generated by `@astrojs/sitemap`
- Robots: `public/robots.txt`
- RSS feed: `/rss.xml`
- Open Graph/Twitter meta tags: set in layouts, with article JSON-LD on post pages
- Tag pages: under `/tags/*`

## Deployment (GitHub Pages)

This repo includes `.github/workflows/deploy.yml` to build and deploy on push to `main`.

Setup steps (one-time in GitHub UI):
1. Settings → Pages:
   - Build and deployment: Source = GitHub Actions
2. Settings → Actions → General:
   - Workflow permissions: Read and write (default is fine)
3. Push to `main`. The action publishes to `https://nicolasmondain.github.io/ooo/`.

Note: Internal links respect the base path `/ooo` for project pages.

## Theming and Tailwind

- Tailwind with `@tailwindcss/typography` is preconfigured.
- Global styles live in `src/styles/tailwind.css`.
- Layouts:
  - `src/layouts/BaseLayout.astro`
  - `src/layouts/PostLayout.astro`

## Roadmap / Nice to have

- MDX support (install `@astrojs/mdx`)
- OG image generation per post
- Search (Lunr/Algolia)
- Analytics (Plausible or GA4)
- Comments (Giscus)
EOF

echo "Installing npm dependencies..."
(
  cd "$BASE"
  npm install
)

echo "Done. Next steps:"
echo "1) cd \"$BASE\""
echo "2) npm run dev    # to develop locally"
echo "3) git add . && git commit -m 'Scaffold blog' && git push origin main"
echo "4) In GitHub: Settings → Pages → Source: GitHub Actions (one-time)."
EOF

How to run
- If you’re inside the repository parent directory:
  - bash -c "$(cat /dev/stdin)" <<'SCRIPT'
  (paste everything between the code fences above)
  SCRIPT
- Or save the script as ooo/.scripts/bootstrap.sh and run:
  - chmod +x ooo/.scripts/bootstrap.sh
  - ooo/.scripts/bootstrap.sh

After it finishes:
- cd ooo
- npm run dev to preview locally
- git add . && git commit -m "Scaffold blog" && git push to trigger GitHub Pages deploy

If you want me to adjust anything (fonts, MDX support, dark mode toggle, OG image generation), say the word and I’ll update the scaffold.
