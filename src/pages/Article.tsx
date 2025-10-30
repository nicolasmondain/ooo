import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug, getArticleContent, type Article } from '@/lib/articles'
import { Badge, Heading, Text, Button } from '@/components'
import { format } from 'date-fns'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return

      try {
        setLoading(true)
        const articleData = getArticleBySlug(slug)
        
        if (!articleData) {
          setError('Article not found')
          return
        }

        const articleContent = await getArticleContent(slug)
        setArticle(articleData)
        setContent(articleContent)
      } catch (err) {
        console.error('Error loading article:', err)
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="text-center py-12 space-y-4">
        <Heading level={2}>Article Not Found</Heading>
        <Text className="text-gray-600 dark:text-gray-400">
          The article you're looking for doesn't exist.
        </Text>
        <Button onClick={() => navigate('/')}>
          <ArrowLeftIcon />
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <Link to="/">
          <Button color="white">
            <ArrowLeftIcon />
            Back to Articles
          </Button>
        </Link>
      </div>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="space-y-6 mb-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} color="blue">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <Heading level={1} className="text-4xl md:text-5xl font-bold">
          {article.title}
        </Heading>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <span className="font-medium">{article.author}</span>
          <span>•</span>
          <time dateTime={article.date}>
            {format(new Date(article.date), 'MMMM d, yyyy')}
          </time>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-bold
        prose-h1:text-4xl prose-h1:mb-6
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-blue-600 dark:prose-a:text-blue-400
        prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-code:text-blue-600 dark:prose-code:text-blue-400
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
        prose-pre:border prose-pre:border-gray-700
        prose-blockquote:border-l-blue-600
        prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10
        prose-blockquote:py-1 prose-blockquote:px-4
        prose-ul:my-6 prose-ol:my-6
        prose-li:my-2
        prose-img:rounded-xl prose-img:shadow-lg
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Button color="white">
              <ArrowLeftIcon />
              Back to Articles
            </Button>
          </Link>
          
          <Text className="text-gray-500 dark:text-gray-400">
            Published on {format(new Date(article.date), 'MMMM d, yyyy')}
          </Text>
        </div>
      </footer>
    </article>
  )
}

