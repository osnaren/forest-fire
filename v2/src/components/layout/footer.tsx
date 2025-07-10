import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                <span className="text-sm font-bold text-white">🔥</span>
              </div>
              <span className="font-display text-lg font-bold text-white">Forest Fire Classifier</span>
            </Link>
            <p className="text-sm text-gray-400">
              Real-time wildfire detection powered by advanced machine learning. From research to production.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Model v1.0</span>
              <span>•</span>
              <Link href="/about#model" className="transition-colors hover:text-gray-400">
                Learn more
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-400 transition-colors hover:text-white">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-400 transition-colors hover:text-white">
                  Live Wildfire Map
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-gray-400 transition-colors hover:text-white">
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
                <span className="cursor-not-allowed text-gray-400">Research Paper (Coming Soon)</span>
              </li>
              <li>
                <span className="cursor-not-allowed text-gray-400">Kaggle Dataset (Coming Soon)</span>
              </li>
              <li>
                <span className="cursor-not-allowed text-gray-400">GitHub Repository (Coming Soon)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-400">
            © 2025 Forest Fire Classifier. Built with Next.js, TensorFlow.js, and Tailwind CSS.
          </p>
          <div className="mt-4 sm:mt-0">
            <p className="text-xs text-gray-500">Made with ❤️ for wildfire prevention</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
