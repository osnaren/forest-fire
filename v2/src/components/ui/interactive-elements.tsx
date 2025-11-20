'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  intensity?: number;
}

export function FloatingElement({
  children,
  className,
  delay = 0,
  duration = 6,
  yOffset = 12,
  intensity = 1,
}: FloatingElementProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn('gpu-accelerated will-change-transform', className)}
      initial={{ y: 0 }}
      animate={{
        y: [0, -yOffset * intensity, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'fire';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const GLOWING_BUTTON_VARIANTS = {
  primary: 'bg-primary text-primary-foreground shadow-primary/50',
  secondary: 'bg-secondary text-secondary-foreground shadow-secondary/50',
  fire: 'bg-linear-to-r from-accent to-accent/80 text-accent-foreground shadow-accent/50',
};

const GLOWING_BUTTON_SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function GlowingButton({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const buttonContent = (
    <button
      className={cn(
        'relative overflow-hidden rounded-full font-medium transition-all duration-300',
        'focus-ring border border-transparent',
        GLOWING_BUTTON_VARIANTS[variant],
        GLOWING_BUTTON_SIZES[size],
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-500',
          isHovered ? 'translate-x-full' : '-translate-x-full'
        )}
      />
      <div
        className={cn(
          'absolute inset-0 rounded-full transition-shadow duration-300',
          isHovered && !disabled && 'shadow-lg'
        )}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );

  if (!isMounted) {
    return buttonContent;
  }

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="gpu-accelerated will-change-transform"
    >
      {buttonContent}
    </motion.div>
  );
}

interface PulsingDotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'amber' | 'red' | 'blue';
}

const PULSING_DOT_SIZES = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const PULSING_DOT_COLORS = {
  emerald: 'bg-primary',
  amber: 'bg-accent',
  red: 'bg-destructive',
  blue: 'bg-secondary',
};

export function PulsingDot({ className, size = 'md', color = 'emerald' }: PulsingDotProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const dotContent = (
    <div className={cn('relative', className)}>
      <div className={cn('rounded-full', PULSING_DOT_SIZES[size], PULSING_DOT_COLORS[color])} />
      <div className={cn('absolute inset-0 animate-ping rounded-full', PULSING_DOT_SIZES[size], PULSING_DOT_COLORS[color], 'opacity-75')} />
    </div>
  );

  if (!isMounted) {
    return dotContent;
  }

  return (
    <div className={cn('relative will-change-transform', className)}>
      <motion.div
        className={cn('rounded-full', PULSING_DOT_SIZES[size], PULSING_DOT_COLORS[color])}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={cn('absolute inset-0 rounded-full', PULSING_DOT_SIZES[size], PULSING_DOT_COLORS[color], 'opacity-75')}
        animate={{
          scale: [1, 1.5, 2],
          opacity: [0.75, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </div>
  );
}

interface StatCounterProps {
  value: string;
  label: string;
  className?: string;
  delay?: number;
}

export function StatCounter({ value, label, className, delay = 0 }: StatCounterProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const counterContent = (
    <div className={cn('text-center', className)}>
      <div className="text-primary mb-1 text-2xl font-bold">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );

  if (!isMounted) {
    return counterContent;
  }

  return (
    <motion.div
      className={cn('text-center will-change-transform', className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        className="text-primary mb-1 text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {value}
      </motion.div>
      <motion.div
        className="text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

interface BackgroundEffectProps {
  className?: string;
}

export function BackgroundEffect({ className }: BackgroundEffectProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    delay: number;
    duration: number;
    yOffset: number;
    intensity: number;
    left: string;
    top: string;
  }>>([]);

  useEffect(() => {
    setIsMounted(true);
    setParticles([...Array(20)].map((_, i) => ({
      delay: i * 0.2,
      duration: 4 + Math.random() * 2,
      yOffset: 30 + Math.random() * 20,
      intensity: 0.5 + Math.random() * 0.5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

  if (!isMounted) {
    return <div className={cn('absolute inset-0 overflow-hidden', className)} />;
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingElement
          key={i}
          className="absolute"
          delay={p.delay}
          duration={p.duration}
          yOffset={p.yOffset}
          intensity={p.intensity}
        >
          <div
            className="bg-primary/30 h-1 w-1 rounded-full blur-sm"
            style={{
              left: p.left,
              top: p.top,
            }}
          />
        </FloatingElement>
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="from-primary/20 absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-linear-to-br to-transparent blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="from-accent/20 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-linear-to-br to-transparent blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
