'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
  glowColor?: string;
}

export function EnhancedCard({
  children,
  className,
  delay = 0,
  hoverScale = 1.02,
  glowColor = 'emerald',
}: EnhancedCardProps) {
  const glowColors = {
    emerald: 'shadow-emerald-500/25 hover:shadow-emerald-500/40',
    amber: 'shadow-amber-500/25 hover:shadow-amber-500/40',
    blue: 'shadow-blue-500/25 hover:shadow-blue-500/40',
    red: 'shadow-red-500/25 hover:shadow-red-500/40',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: hoverScale,
        y: -5,
        transition: { duration: 0.2 },
      }}
      viewport={{ once: true }}
      className={cn('group cursor-pointer', className)}
    >
      <Card
        className={cn(
          'border-opacity-50 h-full backdrop-blur-sm transition-all duration-300',
          'hover:border-opacity-100 hover:bg-opacity-80',
          glowColors[glowColor as keyof typeof glowColors]
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
}

interface TechStackCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  delay?: number;
  accentColor?: 'emerald' | 'amber' | 'blue' | 'purple';
}

export function TechStackCard({
  icon,
  title,
  description,
  features,
  delay = 0,
  accentColor = 'emerald',
}: TechStackCardProps) {
  const accentColors = {
    emerald: {
      gradient: 'from-emerald-500 to-emerald-600',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      bg: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5',
      glow: 'shadow-emerald-500/25 hover:shadow-emerald-500/40',
    },
    amber: {
      gradient: 'from-amber-500 to-amber-600',
      text: 'text-amber-400',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      bg: 'bg-gradient-to-br from-amber-500/10 to-amber-600/5',
      glow: 'shadow-amber-500/25 hover:shadow-amber-500/40',
    },
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      text: 'text-blue-400',
      border: 'border-blue-500/20 hover:border-blue-500/40',
      bg: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5',
      glow: 'shadow-blue-500/25 hover:shadow-blue-500/40',
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      text: 'text-purple-400',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      bg: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5',
      glow: 'shadow-purple-500/25 hover:shadow-purple-500/40',
    },
  };

  const colors = accentColors[accentColor];

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
      <Card
        className={cn(
          'h-full backdrop-blur-sm transition-all duration-500',
          colors.bg,
          colors.border,
          colors.glow,
          'transform-gpu'
        )}
      >
        <CardHeader>
          <motion.div
            className={cn(
              'mb-4 flex h-12 w-12 items-center justify-center rounded-lg shadow-lg',
              `bg-gradient-to-br ${colors.gradient}`,
              colors.glow
            )}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xl">{icon}</span>
          </motion.div>
          <CardTitle className={cn('text-white transition-colors group-hover:transition-colors', colors.text)}>
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
                <div
                  className={cn('h-1.5 w-1.5 rounded-full', colors.gradient.replace('from-', 'bg-').split(' ')[0])}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
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
  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    stable: 'text-gray-400',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→',
  };

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
      className="group"
    >
      <Card className="h-full border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/50">
        <CardContent className="p-6 text-center">
          {icon && <div className="mb-2 text-2xl transition-transform duration-300 group-hover:scale-110">{icon}</div>}
          <motion.div
            className="mb-1 text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {value}
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-1 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
          >
            <span>{label}</span>
            <span className={cn('text-xs', trendColors[trend])}>{trendIcons[trend]}</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
