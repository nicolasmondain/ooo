import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom'
import Home from './pages/Home'
import Article from './pages/Article'
import About from './pages/About'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navigation */}
        <Navbar>
          <NavbarSection>
            <NavbarItem href="/" className="text-xl font-bold">
              📝 My Blog
            </NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem href="/">Home</NavbarItem>
            <NavbarItem href="/about">About</NavbarItem>
          </NavbarSection>
        </Navbar>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  About
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A modern blog built with React, Vite, and Catalyst UI. 
                  Hosted on GitHub Pages.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <RouterLink 
                      to="/" 
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Home
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink 
                      to="/about" 
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      About
                    </RouterLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Built With
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>React + Vite</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS v4</li>
                  <li>Catalyst UI</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
              <p>© {new Date().getFullYear()} My Blog. Built with ❤️ and React.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <div className="text-center py-12 space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">Page not found</p>
      <RouterLink 
        to="/" 
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Home
      </RouterLink>
    </div>
  )
}

export default App
