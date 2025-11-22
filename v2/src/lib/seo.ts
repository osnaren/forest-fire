import type { Metadata } from 'next';

import { siteConfig } from '@/config/pages';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  pathname?: string;
  noIndex?: boolean;
}

const defaultMetadata = {
  title: `${siteConfig.name} ${siteConfig.version}`,
  description: siteConfig.description,
  keywords: [
    'wildfire detection',
    'forest fire',
    'machine learning',
    'tensorflow',
    'environmental monitoring',
    'ai for good',
    'climate change technology',
    'early warning system',
    'computer vision',
    'mobilenet',
    'nextjs',
    'react',
    'open source',
  ],
  image: '/og.png',
  url: siteConfig.url,
  type: 'website' as const,
};

const metadataBase = new URL(siteConfig.url);

function toAbsoluteUrl(target?: string) {
  if (!target) {
    return metadataBase.toString();
  }

  try {
    return new URL(target, metadataBase).toString();
  } catch {
    return metadataBase.toString();
  }
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  pathname,
  noIndex,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} - ${defaultMetadata.title}` : defaultMetadata.title;
  const seoDescription = description || defaultMetadata.description;
  const seoKeywords = keywords || defaultMetadata.keywords;
  const seoImage = toAbsoluteUrl(image || defaultMetadata.image);
  const canonicalUrl = toAbsoluteUrl(url || pathname || defaultMetadata.url);

  return {
    metadataBase,
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: 'Forest Fire Classifier Team' }],
    creator: 'Forest Fire Classifier',
    publisher: 'Forest Fire Classifier',
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    applicationName: siteConfig.name,
    category: 'Technology',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type,
      locale: 'en_US',
      url: canonicalUrl,
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
      creator: siteConfig.author.twitter,
      site: siteConfig.author.twitter,
    },
  };
}
