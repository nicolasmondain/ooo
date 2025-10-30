// Utility functions for loading and managing articles from GitHub Gists

import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  date: string
  readTime: string
  tags: string[]
  published: boolean
  coverImage?: string
}

interface GistFile {
  filename: string
  type: string
  language: string
  raw_url: string
  size: number
  content?: string
}

interface Gist {
  id: string
  html_url: string
  description: string
  created_at: string
  updated_at: string
  files: Record<string, GistFile>
  owner: {
    login: string
  }
  public: boolean
}

const GITHUB_USERNAME = 'nicolasmondain'
const GISTS_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/gists`

// Available cover images for random selection
const COVER_IMAGES = [image1, image2, image3, image4, image5]

// Cache for gists
let gistsCache: Gist[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Deterministic random number generator based on string
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Get random cover image based on gist ID (deterministic)
function getRandomCoverImage(gistId: string): string {
  const index = hashString(gistId) % COVER_IMAGES.length
  return COVER_IMAGES[index]
}

// Calculate read time based on word count
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Extract title from filename or use description
function extractTitle(gist: Gist): string {
  const firstFile = Object.values(gist.files)[0]
  if (firstFile) {
    // Remove .md extension and format as title
    const filename = firstFile.filename.replace(/\.md$/, '')
    return filename
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return gist.description || 'Untitled'
}

// Create slug from filename
function createSlug(gist: Gist): string {
  const firstFile = Object.values(gist.files)[0]
  if (firstFile) {
    return firstFile.filename
      .replace(/\.md$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
  }
  return gist.id
}

// Extract tags from content (looks for tags in frontmatter or first lines)
function extractTags(content: string): string[] {
  // Look for tags in first few lines
  const lines = content.split('\n').slice(0, 10)
  for (const line of lines) {
    if (line.toLowerCase().includes('tags:') || line.toLowerCase().includes('categories:')) {
      const tagsMatch = line.match(/:\s*\[([^\]]+)\]/)
      if (tagsMatch) {
        return tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, ''))
      }
    }
  }
  // Default tags based on content
  const defaultTags: string[] = []
  if (content.toLowerCase().includes('react')) defaultTags.push('React')
  if (content.toLowerCase().includes('typescript')) defaultTags.push('TypeScript')
  if (content.toLowerCase().includes('javascript')) defaultTags.push('JavaScript')
  if (content.toLowerCase().includes('css')) defaultTags.push('CSS')
  
  return defaultTags.length > 0 ? defaultTags : ['General']
}

// Fetch gists from GitHub API
async function fetchGists(): Promise<Gist[]> {
  // Return cached data if still valid
  if (gistsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return gistsCache
  }

  try {
    const response = await fetch(GISTS_API_URL)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const gists: Gist[] = await response.json()
    
    // Filter only markdown gists
    const markdownGists = gists.filter(gist => 
      Object.values(gist.files).some(file => 
        file.filename.endsWith('.md') && file.type === 'text/markdown'
      )
    )
    
    gistsCache = markdownGists
    cacheTimestamp = Date.now()
    
    return markdownGists
  } catch (error) {
    console.error('Error fetching gists:', error)
    return gistsCache || []
  }
}

// Convert gist to article format
async function gistToArticle(gist: Gist): Promise<Article> {
  const firstFile = Object.values(gist.files)[0]
  
  // Fetch content for excerpt and tags if not already loaded
  let content = ''
  if (!firstFile.content && firstFile.raw_url) {
    try {
      const response = await fetch(firstFile.raw_url)
      content = await response.text()
    } catch (error) {
      console.error('Error fetching gist content:', error)
    }
  } else {
    content = firstFile.content || ''
  }
  
  // Extract excerpt from first paragraph
  const lines = content.split('\n').filter(line => line.trim())
  const excerptLines = lines.slice(1, 4) // Skip title, take next few lines
  const excerpt = excerptLines.join(' ').substring(0, 200) + '...'
  
  return {
    id: gist.id,
    title: extractTitle(gist),
    slug: createSlug(gist),
    excerpt: gist.description || excerpt,
    author: gist.owner.login,
    date: gist.updated_at.split('T')[0], // Format: YYYY-MM-DD
    readTime: content ? calculateReadTime(content) : '5 min read',
    tags: extractTags(content),
    published: gist.public,
    coverImage: getRandomCoverImage(gist.id)
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const gists = await fetchGists()
  const articles = await Promise.all(gists.map(gistToArticle))
  
  // Sort by date (newest first)
  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getAllArticles()
  return articles.find(article => article.slug === slug)
}

export async function getArticleContent(slug: string): Promise<string> {
  const gists = await fetchGists()
  
  for (const gist of gists) {
    const gistSlug = createSlug(gist)
    if (gistSlug === slug) {
      const firstFile = Object.values(gist.files)[0]
      if (firstFile && firstFile.raw_url) {
        try {
          const response = await fetch(firstFile.raw_url)
          return await response.text()
        } catch (error) {
          console.error('Error fetching gist content:', error)
          throw new Error(`Failed to fetch content for: ${slug}`)
        }
      }
    }
  }
  
  throw new Error(`Article not found: ${slug}`)
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles()
  const tags = new Set<string>()
  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}
