import { AnimatedGroup } from '@/components/ui';
import { siteConfig } from '@/config/pages';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Forest Fire Classifier',
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <AnimatedGroup preset="blur-slide" className="space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className="prose prose-invert prose-lg mx-auto max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              Welcome to {siteConfig.name} ("we," "our," or "us"). We are committed to protecting your privacy. 
              This Privacy Policy explains how we handle your information when you use our website and services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Data Processing</h2>
            <p>
              Our application is designed with a "privacy-first" approach. When you use our image classification tool:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Client-Side Processing:</strong> All image analysis is performed directly on your device (in your browser) using TensorFlow.js. 
                Your images are <strong>not</strong> uploaded to our servers for analysis unless you explicitly choose a server-side option (if available).
              </li>
              <li>
                <strong className="text-foreground">No Data Retention:</strong> Since processing happens locally, we do not store, save, or retain the images you analyze.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Analytics</h2>
            <p>
              We use Vercel Analytics to understand how our website is used. This service collects anonymous usage data, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Page views and navigation paths</li>
              <li>Device type and browser information</li>
              <li>General geographic location (country/region)</li>
            </ul>
            <p>
              This data is aggregated and does not identify individual users. We use this information solely to improve the performance and user experience of our application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Third-Party Services</h2>
            <p>
              Our website is hosted on Vercel. Please refer to Vercel's privacy policy for information on how they handle data related to hosting and infrastructure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href={`mailto:${siteConfig.author.email}`} className="text-primary hover:underline">
                {siteConfig.author.email}
              </a>
            </p>
          </section>
        </div>
      </AnimatedGroup>
    </main>
  );
}
