'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
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
  icon?: string;
  delay?: number;
  trend?: 'up' | 'down' | 'stable';
}

export function MetricCard({ value, label, icon, delay = 0, trend = 'stable' }: MetricCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trendColors = {
    up: 'text-primary',
    down: 'text-destructive',
    stable: 'text-muted-foreground',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→',
  };

  const cardContent = (
    <Card className="group border-border/50 bg-card/80 hover:border-border hover:bg-card/90 relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-foreground text-2xl font-bold sm:text-3xl">{value}</div>
            <div className="text-muted-foreground text-sm">{label}</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {icon && <span className="text-xl opacity-50">{icon}</span>}
            <span className={cn('text-sm font-medium', trendColors[trend])}>{trendIcons[trend]}</span>
          </div>
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
