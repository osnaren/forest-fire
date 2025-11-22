'use client';

import { cn } from '@/lib/utils';
import { Loader2, X } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

type BadgeProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'emerald' | 'amber' | 'blue' | 'purple';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  onClick?: () => void;
  removable?: boolean;
  className?: string;
  maxWidth?: string | number;
  appearance?: 'solid' | 'outline' | 'subtle';
  onRemove?: () => void;
  isLoading?: boolean;
  animated?: boolean;
};

export const ModernBadge = ({
  label,
  variant = 'primary',
  size = 'medium',
  icon,
  onClick,
  removable = false,
  className,
  maxWidth,
  appearance = 'solid',
  onRemove,
  isLoading = false,
  animated = true,
}: BadgeProps) => {
  const variantStyles = {
    primary: {
      solid: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      outline: 'border-2 border-blue-500 text-blue-500 bg-blue-500/5',
      subtle: 'bg-blue-500/10 text-blue-600',
    },
    secondary: {
      solid: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
      outline: 'border-2 border-gray-500 text-gray-500 bg-gray-500/5',
      subtle: 'bg-gray-500/10 text-gray-600',
    },
    success: {
      solid: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
      outline: 'border-2 border-green-500 text-green-500 bg-green-500/5',
      subtle: 'bg-green-500/10 text-green-600',
    },
    warning: {
      solid: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      outline: 'border-2 border-yellow-500 text-yellow-500 bg-yellow-500/5',
      subtle: 'bg-yellow-500/10 text-yellow-600',
    },
    error: {
      solid: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
      outline: 'border-2 border-red-500 text-red-500 bg-red-500/5',
      subtle: 'bg-red-500/10 text-red-600',
    },
    emerald: {
      solid: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
      outline: 'border-2 border-emerald-500 text-emerald-500 bg-emerald-500/5',
      subtle: 'bg-emerald-500/10 text-emerald-600',
    },
    amber: {
      solid: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
      outline: 'border-2 border-amber-500 text-amber-500 bg-amber-500/5',
      subtle: 'bg-amber-500/10 text-amber-600',
    },
    blue: {
      solid: 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white',
      outline: 'border-2 border-blue-500 text-blue-500 bg-blue-500/5',
      subtle: 'bg-blue-500/10 text-blue-600',
    },
    purple: {
      solid: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white',
      outline: 'border-2 border-purple-500 text-purple-500 bg-purple-500/5',
      subtle: 'bg-purple-500/10 text-purple-600',
    },
  };

  const sizeStyles = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  const motionProps = animated
    ? {
        initial: { opacity: 0, scale: 0.95, y: 10, filter: 'blur(10px)' },
        animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 0.4, type: 'spring' as const },
        whileHover: {
          scale: onClick ? 1.05 : 1,
          y: onClick ? -2 : 0,
          transition: {
            duration: 0.2,
            type: 'spring' as const,
          },
        },
        whileTap: onClick ? { scale: 0.95 } : {},
      }
    : {};

  return (
    <motion.div
      {...motionProps}
      onClick={handleClick}
      style={{ maxWidth }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border-0 font-medium shadow-lg backdrop-blur-sm',
        variantStyles[variant][appearance],
        sizeStyles[size],
        onClick && 'cursor-pointer hover:shadow-xl',
        className
      )}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex-shrink-0"
        >
          <Loader2 className="h-4 w-4" />
        </motion.div>
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      <span className="truncate">{label}</span>
      {removable && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          whileHover={{
            scale: 1.1,
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: 'easeInOut',
              type: 'spring',
            },
          }}
          className="flex items-center justify-center rounded-full bg-white/20 p-1 opacity-60 transition-all hover:bg-white/30 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(e);
          }}
        >
          <X className="h-3 w-3" />
        </motion.button>
      )}
    </motion.div>
  );
};
