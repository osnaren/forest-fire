import { AnimatedGroup } from '@/components/ui';
import { siteConfig } from '@/config/pages';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Forest Fire Classifier',
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <AnimatedGroup preset="blur-slide" className="space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
          <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className="prose prose-invert prose-lg text-muted-foreground mx-auto max-w-none space-y-8">
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using {siteConfig.name}, you accept and agree to be bound by the terms and provision of
              this agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">2. Use License & Service Limits</h2>
            <p>
              {siteConfig.name} is an open-source project. The source code is available under the MIT License. However,
              the hosted service provided at {siteConfig.url} is for personal and non-commercial use.
            </p>
            <p>To ensure service availability for all users and protect our infrastructure:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                We enforce rate limits on API requests. Excessive usage may result in temporary access restrictions.
              </li>
              <li>
                The machine learning model runs on our servers to maintain integrity and performance. You agree not to
                attempt to reverse engineer the API or bypass rate limits.
              </li>
              <li>
                While we process your images to provide predictions, we do not claim ownership or store your content.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">3. Disclaimer</h2>
            <p>
              The materials on {siteConfig.name} are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim and negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
            <p className="font-medium text-amber-500">
              Critical Safety Warning: This tool is for educational and demonstration purposes only. It should NOT be
              used as a primary safety tool or for emergency decision-making. Always rely on official local authorities
              and professional equipment for fire safety and emergency response.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">4. Limitations</h2>
            <p>
              In no event shall {siteConfig.name} or its contributors be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on {siteConfig.name}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on {siteConfig.name} could include technical, typographical, or photographic
              errors. We do not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you
              irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </AnimatedGroup>
    </main>
  );
}
