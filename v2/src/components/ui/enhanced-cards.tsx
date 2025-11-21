'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface TechStackCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  delay?: number;
  accentColor?: 'primary' | 'accent' | 'secondary' | 'destructive';
}

export function TechStackCard({
  icon,
  title,
  description,
  features,
  delay = 0,
  accentColor = 'primary',
}: TechStackCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const accentColors = {
    primary: {
      gradient: 'from-primary to-primary/80',
      text: 'text-primary',
      border: 'border-primary/20 hover:border-primary/40',
      bg: 'bg-gradient-to-br from-primary/10 to-primary/5',
      glow: 'hover:shadow-lg hover:shadow-primary/25',
    },
    accent: {
      gradient: 'from-accent to-accent/80',
      text: 'text-accent',
      border: 'border-accent/20 hover:border-accent/40',
      bg: 'bg-gradient-to-br from-accent/10 to-accent/5',
      glow: 'hover:shadow-lg hover:shadow-accent/25',
    },
    secondary: {
      gradient: 'from-secondary to-secondary/80',
      text: 'text-secondary-foreground',
      border: 'border-secondary/20 hover:border-secondary/40',
      bg: 'bg-gradient-to-br from-secondary/10 to-secondary/5',
      glow: 'hover:shadow-lg hover:shadow-secondary/25',
    },
    destructive: {
      gradient: 'from-destructive to-destructive/80',
      text: 'text-destructive',
      border: 'border-destructive/20 hover:border-destructive/40',
      bg: 'bg-gradient-to-br from-destructive/10 to-destructive/5',
      glow: 'hover:shadow-lg hover:shadow-destructive/25',
    },
  };

  const colors = accentColors[accentColor || 'primary'];

  const cardContent = (
    <Card
      className={cn(
        'h-full backdrop-blur-sm transition-all duration-500',
        colors?.bg,
        colors?.border,
        colors?.glow,
        'transform-gpu'
      )}
    >
      <CardHeader>
        <motion.div
          className={cn(
            'mb-4 flex h-12 w-12 items-center justify-center rounded-lg shadow-lg',
            `bg-linear-to-br ${colors?.gradient}`,
            colors?.glow
          )}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xl">{icon}</span>
        </motion.div>
        <CardTitle className={cn('text-white transition-colors group-hover:transition-colors', colors?.text)}>
          {title}
        </CardTitle>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: delay + index * 0.1 + 0.2,
              }}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <div className={cn('h-1.5 w-1.5 rounded-full', colors?.gradient.replace('from-', 'bg-').split(' ')[0])} />
              {feature}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  if (!isMounted) {
    return <div className="group cursor-pointer">{cardContent}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        type: 'spring',
        stiffness: 120,
        damping: 15,
      }}
      whileHover={{
        scale: 1.02,
        y: -8,
        rotateX: 2,
        transition: { duration: 0.3 },
      }}
      viewport={{ once: true }}
      className="group perspective-1000 cursor-pointer"
    >
      {cardContent}
    </motion.div>
  );
}

interface MetricCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  delay?: number;
  trend?: 'up' | 'down' | 'stable';
}

export function MetricCard({ value, label, description = '', icon, delay = 0, trend = 'stable' }: MetricCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trendStyles = {
    up: {
      badge: 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200',
      beam: 'via-emerald-300/40',
      fill: 'from-emerald-300 via-emerald-200 to-emerald-300',
      label: 'Rising',
    },
    down: {
      badge: 'border-rose-300/40 bg-rose-500/10 text-rose-200',
      beam: 'via-rose-300/40',
      fill: 'from-rose-300 via-rose-200 to-rose-300',
      label: 'Softening',
    },
    stable: {
      badge: 'border-slate-200/30 bg-slate-200/5 text-slate-200',
      beam: 'via-slate-200/30',
      fill: 'from-slate-200 via-slate-100 to-slate-200',
      label: 'Steady',
    },
  } as const;

  const cardContent = (
    <Card className="group bg-card/70 relative overflow-hidden border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/10">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent',
            trendStyles[trend].beam
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.1),transparent_55%)]" />
      </div>
      <CardContent className="relative space-y-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/60 uppercase">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{value}</p>
          </div>
          <div className="flex flex-col items-end gap-3 text-right">
            {icon && (
              <Image
                src={icon}
                alt={label}
                width={32}
                height={32}
                className="text-2xl text-white/50 transition-colors group-hover:text-white/80"
              />
            )}
          </div>
        </div>
        {description && <p className="text-sm text-white/70">{description}</p>}
        <div className="relative h-2 w-full justify-self-center overflow-hidden rounded-full bg-white/10 transition-all group-hover:w-3/4">
          <motion.span
            className={cn('absolute inset-y-0 rounded-full bg-linear-to-r', trendStyles[trend].fill)}
            initial={{ width: '20%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute inset-y-0 w-1/3 rounded-full bg-white/30 blur-md"
            initial={{ x: '-50%' }}
            animate={{ x: '150%' }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </CardContent>
    </Card>
  );

  if (!isMounted) {
    return cardContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      viewport={{ once: true }}
      className="gpu-accelerated will-change-transform"
    >
      {cardContent}
    </motion.div>
  );
}
