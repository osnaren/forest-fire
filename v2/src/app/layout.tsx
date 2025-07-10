import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from "@/hooks/use-theme";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'Forest Fire Classifier v2',
  description: 'Professional-grade wildfire detection powered by advanced machine learning. Real-time forest fire classification from images.',
  keywords: ['wildfire', 'forest fire', 'machine learning', 'tensorflow', 'detection', 'classification'],
  authors: [{ name: 'Forest Fire Classifier Team' }],
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
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="forest-fire-theme">
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
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
