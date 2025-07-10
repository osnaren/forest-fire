import { Footer, Navbar } from '@/components/layout';
import SponsorFAB from '@/components/sponsor/SponsorFAB';
import ThemeProvider from '@/hooks/use-theme';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import './index.css';

export const metadata: Metadata = {
  title: 'Forest Fire Classifier v2',
  description:
    'Professional-grade wildfire detection powered by advanced machine learning. Real-time forest fire classification from images.',
  keywords: ['wildfire', 'forest fire', 'machine learning', 'tensorflow', 'detection', 'classification'],
  authors: [{ name: 'Obuli Sai Naren', url: 'https://osnaren.com' }],
  creator: 'Forest Fire Classifier',
  publisher: 'Forest Fire Classifier',
  openGraph: {
    title: 'Forest Fire Classifier v2',
    description: 'Professional-grade wildfire detection powered by advanced machine learning.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forest Fire Classifier v2',
    description: 'Professional-grade wildfire detection powered by advanced machine learning.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon1.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon1.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="forest-fire-theme">
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <SponsorFAB />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
