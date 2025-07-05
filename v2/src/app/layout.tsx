import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Forest Fire Classifier v2',
  description: 'A professional-grade wildfire detection tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
