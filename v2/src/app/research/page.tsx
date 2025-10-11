import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSEOMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Research',
  description: 'Explore the research, datasets, and methodologies behind our wildfire detection system.',
  pathname: '/research',
  type: 'article',
  keywords: [
    'wildfire detection research',
    'forest fire datasets',
    'machine learning methodology',
    'convolutional neural networks wildfire',
  ],
});

export default function ResearchPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Research & Methodology</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Built on solid scientific foundations, our wildfire detection system leverages cutting-edge machine learning
            research and comprehensive datasets.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Research Paper</CardTitle>
              <CardDescription>
                Our peer-reviewed research on deep learning approaches to wildfire detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300">
                This paper presents a comprehensive study on using convolutional neural networks for real-time forest
                fire detection from satellite and aerial imagery.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Read Paper (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Dataset</CardTitle>
              <CardDescription>Kaggle dataset with thousands of labeled forest fire images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300">
                Our model was trained on a curated dataset containing fire, smoke, and non-fire images collected from
                various sources and geographical regions.
              </p>
              <Button variant="outline" className="w-full" disabled>
                View Dataset (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="font-display text-center text-3xl font-bold">Model Performance</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">94.2%</CardTitle>
                <CardDescription>Overall Accuracy</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">91.8%</CardTitle>
                <CardDescription>Fire Detection Precision</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">96.1%</CardTitle>
                <CardDescription>Smoke Detection Recall</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
