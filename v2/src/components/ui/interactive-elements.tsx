'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

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
  duration = 3,
  yOffset = 20,
  intensity = 1,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn(className)}
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

export function GlowingButton({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-emerald-500 text-white shadow-emerald-500/50',
    secondary: 'bg-gray-800 text-white shadow-gray-500/50',
    fire: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-orange-500/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-full font-medium transition-all duration-300',
        'border border-transparent',
        variants[variant],
        sizes[size],
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        initial={{ x: '-100%' }}
        animate={{
          x: isHovered ? '100%' : '-100%',
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${variant === 'fire' ? '#f59e0b' : variant === 'primary' ? '#10b981' : '#6b7280'}`
            : 'none',
        }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

interface PulsingDotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'amber' | 'red' | 'blue';
}

export function PulsingDot({ className, size = 'md', color = 'emerald' }: PulsingDotProps) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const colors = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className={cn('rounded-full', sizes[size], colors[color])}
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
        className={cn(
          'absolute inset-0 rounded-full',
          colors[color],
          'opacity-40'
        )}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
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
  return (
    <motion.div
      className={cn('text-center', className)}
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
        className="text-2xl font-bold text-emerald-400 mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {value}
      </motion.div>
      <motion.div
        className="text-sm text-gray-400"
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
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingElement
          key={i}
          className="absolute"
          delay={i * 0.2}
          duration={4 + Math.random() * 2}
          yOffset={30 + Math.random() * 20}
          intensity={0.5 + Math.random() * 0.5}
        >
          <div
            className="w-1 h-1 bg-emerald-400/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        </FloatingElement>
      ))}
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-3xl"
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
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/20 to-transparent blur-3xl"
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
