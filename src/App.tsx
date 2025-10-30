import { useState } from 'react'
import { Link } from '@/components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            React + Vite + Catalyst
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your project is ready with Tailwind CSS v4 and Catalyst UI Kit
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-center space-y-4">
          <p className="text-2xl font-semibold text-white">Counter Demo</p>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-50 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            Count is {count}
          </button>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            ✅ What's Configured
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Tailwind CSS v4</strong> - Latest version with modern features</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Headless UI</strong> - Unstyled, accessible components</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Heroicons</strong> - Beautiful SVG icons</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Motion</strong> - Animation library</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Inter Font</strong> - Professional typography</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            🚀 Next Steps
          </h2>
          <ol className="space-y-2 text-gray-600 dark:text-gray-300 list-decimal list-inside">
            <li>
              Download Catalyst components from{' '}
              <Link
                href="https://catalyst.tailwindui.com/docs"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Tailwind UI
              </Link>
            </li>
            <li>Copy components into <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">src/components/</code></li>
            <li>Start building your beautiful UI!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
