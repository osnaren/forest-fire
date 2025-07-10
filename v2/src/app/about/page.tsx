import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Forest Fire Classifier v2',
  description: 'Learn about our journey from research to real-time wildfire detection technology.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">From Research to Real-Time</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Discover how our forest fire classification system evolved from academic research to a production-ready
            wildfire detection tool.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold" id="model">
              Model Architecture
            </h2>
            <p className="text-gray-300">
              Our classification system is built on a MobileNet-based convolutional neural network, optimized for both
              accuracy and speed. The model can distinguish between fire, smoke, and non-fire scenarios with high
              precision.
            </p>

            <h2 className="text-2xl font-semibold">Technology Stack</h2>
            <p className="text-gray-300">
              Built with modern web technologies including Next.js 14, TensorFlow.js, TypeScript, and Tailwind CSS. The
              application supports both client-side and server-side inference for optimal performance.
            </p>

            <h2 className="text-2xl font-semibold">Mission</h2>
            <p className="text-gray-300">
              Our mission is to democratize wildfire detection technology, making it accessible to researchers,
              developers, and organizations working on forest fire prevention and early detection systems.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
