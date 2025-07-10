import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'Research - Forest Fire Classifier v2',
  description: 'Explore the research, datasets, and methodologies behind our wildfire detection system.',
};

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display">
            Research & Methodology
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built on solid scientific foundations, our wildfire detection system 
            leverages cutting-edge machine learning research and comprehensive datasets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Research Paper</CardTitle>
              <CardDescription>
                Our peer-reviewed research on deep learning approaches to wildfire detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                This paper presents a comprehensive study on using convolutional neural networks 
                for real-time forest fire detection from satellite and aerial imagery.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Read Paper (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Dataset</CardTitle>
              <CardDescription>
                Kaggle dataset with thousands of labeled forest fire images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                Our model was trained on a curated dataset containing fire, smoke, and 
                non-fire images collected from various sources and geographical regions.
              </p>
              <Button variant="outline" className="w-full" disabled>
                View Dataset (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold font-display text-center">Model Performance</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
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
