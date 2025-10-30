import { Link } from 'react-router-dom'
import { getAllArticles } from '@/lib/articles'
import { Badge, Heading, Text } from '@/components'
import { format } from 'date-fns'

export default function Home() {
  const articles = getAllArticles()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <Heading level={1} className="text-5xl font-bold">
          Welcome to My Blog
        </Heading>
        <Text className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Thoughts on web development, design, and technology
        </Text>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Cover Image */}
            {article.coverImage && (
              <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} color="blue">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <Heading level={3} className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </Heading>

              {/* Excerpt */}
              <Text className="text-gray-600 dark:text-gray-400 line-clamp-3">
                {article.excerpt}
              </Text>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="font-medium">{article.author}</span>
                <div className="flex items-center gap-3">
                  <span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {articles.length === 0 && (
        <div className="text-center py-12">
          <Text className="text-gray-500 dark:text-gray-400">
            No articles published yet. Check back soon!
          </Text>
        </div>
      )}
    </div>
  )
}

