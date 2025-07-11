import type { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const defaultMetadata = {
  title: 'Forest Fire Classifier v2',
  description:
    'Professional-grade wildfire detection powered by advanced machine learning. Real-time forest fire classification from images.',
  keywords: ['wildfire', 'forest fire', 'machine learning', 'tensorflow', 'detection', 'classification'],
  image: '/og-image.jpg',
  url: 'https://fire.osnaren.com',
  type: 'website' as const,
};

export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} - ${defaultMetadata.title}` : defaultMetadata.title;
  const seoDescription = description || defaultMetadata.description;
  const seoKeywords = keywords || defaultMetadata.keywords;
  const seoImage = image || defaultMetadata.image;
  const seoUrl = url || defaultMetadata.url;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: 'Forest Fire Classifier Team' }],
    creator: 'Forest Fire Classifier',
    publisher: 'Forest Fire Classifier',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type,
      locale: 'en_US',
      url: seoUrl,
      siteName: defaultMetadata.title,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@forestfireclassifier',
    },
    alternates: {
      canonical: seoUrl,
    },
  };
}
