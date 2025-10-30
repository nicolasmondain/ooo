# GitHub Gists Integration

Your blog now automatically fetches articles from your GitHub Gists instead of using static files.

## How It Works

1. **Fetches Gists**: The blog queries the GitHub API at `https://api.github.com/users/nicolasmondain/gists`
2. **Filters Markdown**: Only displays public Gists with `.md` files
3. **Auto-mapping**: Gist properties are automatically mapped to article properties
4. **Caching**: API responses are cached for 5 minutes to reduce requests

## Article Property Mapping

| Article Property | Source |
|------------------|--------|
| `id` | Gist ID |
| `title` | Filename (formatted) |
| `slug` | Filename (URL-friendly) |
| `excerpt` | Gist description or first paragraphs |
| `author` | GitHub username |
| `date` | Gist's `updated_at` |
| `readTime` | Auto-calculated from word count |
| `tags` | Auto-detected from content |
| `coverImage` | Randomly assigned (deterministic) |

## Creating Articles

Simply create a public Gist on GitHub:

1. Go to https://gist.github.com
2. Create a new Gist
3. Name it with `.md` extension (e.g., `my-article.md`)
4. Write your content in Markdown
5. Set visibility to **Public**
6. Save

The blog will automatically fetch and display it!

## Cover Images

Each article gets a cover image from `src/images/photos/` (image-1.jpg through image-5.jpg). The selection uses a deterministic hash function based on the Gist ID, ensuring:

- The same article always shows the same image
- Images are evenly distributed across articles
- No need to manually assign images

## Tag Detection

Tags are automatically detected from your content:

- Mentions of "React" → React tag
- Mentions of "TypeScript" → TypeScript tag  
- Mentions of "JavaScript" → JavaScript tag
- Mentions of "CSS" → CSS tag
- No matches → "General" tag

You can also specify tags in your Gist description or frontmatter.

## Customization

### Change GitHub Username

Edit `src/lib/articles.ts`:

```ts
const GITHUB_USERNAME = 'your-username'
```

### Adjust Cache Duration

Edit `src/lib/articles.ts`:

```ts
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes (in milliseconds)
```

### Modify Tag Detection

Edit the `extractTags()` function in `src/lib/articles.ts` to add your own keywords.

### Change Cover Images

Replace images in `src/images/photos/` or modify the `COVER_IMAGES` array in `src/lib/articles.ts`.

## Advantages

- **No build needed** for new articles - just create a Gist
- **Easy editing** - edit Gists directly on GitHub
- **Version control** - GitHub tracks Gist history
- **Portable** - articles stored in GitHub, not local files
- **Shareable** - Gists have their own URLs
- **No deployment** - changes appear automatically (after cache expires)

## API Rate Limiting

GitHub API has rate limits:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

With 5-minute caching, you'll make ~12 requests/hour, well within limits.

To authenticate (optional), modify `src/lib/articles.ts`:

```ts
const response = await fetch(GISTS_API_URL, {
  headers: {
    'Authorization': 'token YOUR_GITHUB_TOKEN'
  }
})
```

## Example Gist

Your existing Gist at https://gist.github.com/nicolasmondain/33808a71847dae6eeda9016faec51d70 will automatically appear as an article titled "Building Static Sites".

## Troubleshooting

### Articles not showing

- Check Gists are public
- Ensure filenames end with `.md`
- Wait 5 minutes for cache to expire
- Check browser console for API errors

### Wrong title/slug

The title and slug are derived from the filename. Rename your Gist file to change them.

Example:
- `my-article.md` → "My Article" (slug: `my-article`)
- `react-hooks-guide.md` → "React Hooks Guide" (slug: `react-hooks-guide`)

### API errors

If you see errors in console:
- Check GitHub API status
- Verify username is correct
- Check rate limits

## Local Development

During development, the blog will fetch from GitHub Gists. Create test Gists to see them appear locally.

## Production

On GitHub Pages, the blog will also fetch from Gists. No special configuration needed!

