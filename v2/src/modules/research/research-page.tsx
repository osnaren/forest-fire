'use client';

import { motion } from 'framer-motion';
import { Database, ExternalLink, FileText, Flame, Layers, Microscope, Zap } from 'lucide-react';
import Link from 'next/link';

import {
  AnimatedGradientText,
  AnimatedGroup,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  GradientText,
  WobbleCard,
} from '@/components/ui';
import { researchConfig } from '@/config/pages';

export function ResearchPage() {
  const { hero, dataset, paper, methodology, modelNote } = researchConfig;

  return (
    <div className="min-h-screen w-full space-y-24 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl space-y-6"
        >
          <div className="flex justify-center">
            <AnimatedGradientText className="px-6 py-2 text-sm font-medium">
              <span className="mr-2">🔬</span> Scientific Foundation
            </AnimatedGradientText>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <GradientText>{hero.title}</GradientText>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">{hero.description}</p>
        </motion.div>
      </section>

      {/* Dataset Section */}
      <section className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="mb-4 text-3xl font-bold">{dataset.title}</h2>
          <p className="text-muted-foreground max-w-2xl">{dataset.description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-blue-900/20">
            <div className="relative z-10 h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <Database className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Comprehensive Data</h3>
              <p className="mt-2 text-neutral-200">
                A balanced collection of {dataset.stats.find((s) => s.label === 'Total Images')?.value} images,
                meticulously labeled to ensure model fairness and accuracy across all conditions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {dataset.stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <div className="text-sm text-neutral-300">{stat.label}</div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </WobbleCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {dataset.classes.map((cls) => (
              <Card
                key={cls.name}
                className="bg-secondary/30 hover:bg-secondary/50 overflow-hidden border-none transition-colors"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {cls.name === 'Fire' && <Flame className="h-5 w-5 text-red-500" />}
                    {cls.name === 'Smoke' && <Layers className="h-5 w-5 text-gray-400" />}
                    {cls.name === 'No Fire' && <Microscope className="h-5 w-5 text-green-500" />}
                    {cls.name === 'SmokeFire' && <Flame className="h-5 w-5 text-orange-500" />}
                    {cls.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{cls.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href={dataset.links.kaggle} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View Dataset on Kaggle
            </Link>
          </Button>
        </div>
      </section>

      {/* Paper Section */}
      <section className="container mx-auto px-4">
        <Card className="border-primary/20 from-background to-primary/5 overflow-hidden bg-linear-to-br">
          <div className="grid gap-8 p-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="text-primary mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-semibold">Published Research</span>
              </div>
              <h2 className="mb-2 text-3xl font-bold">{paper.title}</h2>
              <p className="text-muted-foreground mb-6 text-lg font-medium">{paper.subtitle}</p>
              <blockquote className="border-primary/30 text-muted-foreground mb-6 border-l-4 pl-4 italic">
                "{paper.abstract}"
              </blockquote>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href={paper.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Read Full Paper
                  </Link>
                </Button>
                <div className="bg-secondary text-muted-foreground flex items-center gap-2 rounded-md px-4 py-2 text-xs">
                  <span>DOI: 10.1186/s42408-022-00165-0</span>
                </div>
              </div>
            </div>
            <div className="bg-background/50 flex flex-col justify-center rounded-xl p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-semibold">Citation</h3>
              <code className="bg-secondary text-foreground rounded p-4 text-xs leading-relaxed">
                {paper.citation}
              </code>
            </div>
          </div>
        </Card>
      </section>

      {/* Model Note Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-linear-to-r from-amber-500/10 to-orange-500/10 p-8 backdrop-blur-sm">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-3xl shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-amber-500">{modelNote.title}</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {modelNote.content}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Methodology Section */}
      <section className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{methodology.title}</h2>
          <p className="text-muted-foreground">The technical pipeline behind the results</p>
        </div>

        <AnimatedGroup className="grid gap-6 md:grid-cols-3">
          {methodology.steps.map((step, idx) => (
            <Card key={step.title} className="bg-secondary/20 relative overflow-hidden border-none">
              <div className="bg-primary/5 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-2xl" />
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold">
                  {idx + 1}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </AnimatedGroup>
      </section>
    </div>
  );
}
