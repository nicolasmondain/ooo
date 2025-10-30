import { Heading, Text, Badge } from '@/components'
import { getAllTags } from '@/lib/articles'

export default function About() {
  const tags = getAllTags()

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 py-12">
        <Heading level={1} className="text-5xl font-bold">
          About This Blog
        </Heading>
        <Text className="text-xl text-gray-600 dark:text-gray-400">
          A place for sharing knowledge and ideas
        </Text>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="space-y-6">
          <Heading level={2}>Welcome! 👋</Heading>
          
          <Text>
            This blog is built with modern web technologies to demonstrate how you can create
            a fast, beautiful, and maintainable static blog that can be hosted for free on
            GitHub Pages.
          </Text>

          <Heading level={3}>Tech Stack</Heading>
          
          <ul className="space-y-3">
            <li>
              <strong>React</strong> - A JavaScript library for building user interfaces
            </li>
            <li>
              <strong>Vite</strong> - Next generation frontend tooling for blazing fast development
            </li>
            <li>
              <strong>TypeScript</strong> - For type-safe code and better developer experience
            </li>
            <li>
              <strong>Tailwind CSS v4</strong> - Utility-first CSS framework for rapid UI development
            </li>
            <li>
              <strong>Catalyst UI</strong> - Beautiful component system from Tailwind Labs
            </li>
            <li>
              <strong>React Router</strong> - Client-side routing for a smooth navigation experience
            </li>
            <li>
              <strong>React Markdown</strong> - Render markdown content as React components
            </li>
          </ul>

          <Heading level={3}>Features</Heading>
          
          <ul className="space-y-3">
            <li>📝 Write articles in Markdown</li>
            <li>🎨 Beautiful UI with Catalyst components</li>
            <li>🌓 Dark mode support</li>
            <li>📱 Fully responsive design</li>
            <li>⚡ Lightning fast performance</li>
            <li>🔍 SEO friendly</li>
            <li>🆓 Free hosting on GitHub Pages</li>
            <li>🚀 Easy to deploy and maintain</li>
          </ul>

          <Heading level={3}>Content Organization</Heading>
          
          <Text>
            All articles are managed through a simple JSON file that contains metadata,
            while the actual content is written in Markdown files. This separation makes
            it easy to manage and update content without touching code.
          </Text>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <Text className="font-mono text-sm">
              src/data/articles.json → Article metadata<br />
              src/data/articles/*.md → Article content
            </Text>
          </div>

          <Heading level={3}>Topics Covered</Heading>
          
          <div className="flex flex-wrap gap-2 not-prose">
            {tags.map((tag) => (
              <Badge key={tag} color="blue">
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-6">
          <Heading level={2}>Getting Started</Heading>
          
          <Text>
            If you want to create your own blog using this template:
          </Text>

          <ol className="space-y-3">
            <li>Clone the repository</li>
            <li>Install dependencies with <code>npm install</code></li>
            <li>Add your articles to <code>src/data/articles.json</code></li>
            <li>Write your content in <code>src/data/articles/*.md</code></li>
            <li>Customize the design to match your style</li>
            <li>Deploy to GitHub Pages</li>
          </ol>

          <Text>
            It's that simple! No database, no backend, no complicated setup. Just pure,
            static HTML, CSS, and JavaScript that loads instantly and works everywhere.
          </Text>
        </section>

        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-6">
          <Heading level={2}>Philosophy</Heading>
          
          <Text>
            This blog embraces the JAMstack philosophy: <strong>J</strong>avaScript,
            <strong>A</strong>PIs, and <strong>M</strong>arkup. By pre-rendering all pages
            at build time, we achieve:
          </Text>

          <ul className="space-y-3">
            <li>Better performance - No server-side processing</li>
            <li>Better security - No server to hack</li>
            <li>Better scalability - Serve from CDN</li>
            <li>Better developer experience - Simple workflow</li>
          </ul>

          <Text>
            The future of the web is static, fast, and secure. Welcome aboard! 🚀
          </Text>
        </section>
      </div>
    </div>
  )
}

