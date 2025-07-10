import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-charcoal-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">🔥</span>
              </div>
              <span className="font-display text-lg font-bold text-white">
                Forest Fire Classifier
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Real-time wildfire detection powered by advanced machine learning.
              From research to production.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Model v1.0</span>
              <span>•</span>
              <Link href="/about#model" className="hover:text-gray-400 transition-colors">
                Learn more
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-400 hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-400 hover:text-white transition-colors">
                  Live Wildfire Map
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Research Paper (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Kaggle Dataset (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  GitHub Repository (Coming Soon)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Forest Fire Classifier. Built with Next.js, TensorFlow.js, and Tailwind CSS.
          </p>
          <div className="mt-4 sm:mt-0">
            <p className="text-gray-500 text-xs">
              Made with ❤️ for wildfire prevention
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
