import { Footer, Navbar } from '@/components/layout';
import SponsorFAB from '@/components/sponsor/SponsorFAB';
import { siteConfig } from '@/config/pages';
import ThemeProvider from '@/hooks/use-theme';
import { generateSEOMetadata } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import './index.css';

const baseMetadata = generateSEOMetadata();

export const metadata: Metadata = {
  ...baseMetadata,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }, { name: 'Forest Fire Classifier Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/web-app-manifest-192x192.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script id="ld-json-organisation" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/favicon/web-app-manifest-512x512.png`,
          sameAs: [siteConfig.social.github, siteConfig.social.twitter, siteConfig.social.linkedin],
          contactPoint: [
            {
              '@type': 'ContactPoint',
              email: siteConfig.author.email,
              contactType: 'technical support',
              availableLanguage: ['English'],
            },
          ],
        })}
      </Script>
      <Script id="ld-json-website" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          url: siteConfig.url,
          publisher: {
            '@type': 'Organization',
            name: siteConfig.author.labsName,
            url: siteConfig.url,
          },
        })}
      </Script>
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
