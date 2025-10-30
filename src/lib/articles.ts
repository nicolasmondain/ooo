// Utility functions for loading and managing articles

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

// Import all articles
import articlesData from '@/data/articles.json'

// Import markdown files dynamically
const articleModules = import.meta.glob('@/data/articles/*.md', { 
  query: '?raw',
  import: 'default'
})

export function getAllArticles(): Article[] {
  return articlesData
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articlesData.find(article => article.slug === slug && article.published)
}

export async function getArticleContent(slug: string): Promise<string> {
  const path = `/src/data/articles/${slug}.md`
  const loader = articleModules[path]
  
  if (!loader) {
    throw new Error(`Article not found: ${slug}`)
  }
  
  const content = await loader()
  return content as string
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  articlesData.forEach(article => {
    article.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

