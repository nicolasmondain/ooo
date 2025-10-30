import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Article from './pages/Article'
import About from './pages/About'
import { Layout } from '@/components/spotlight'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100">404</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">Page not found</p>
      </div>
    </div>
  )
}

export default App
