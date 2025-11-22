'use client';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

type Shape =
  | {
      id: string;
      type: 'rect';
      fill: string;
      delay: number;
      props: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
    }
  | {
      id: string;
      type: 'polygon';
      fill: string;
      delay: number;
      points: string;
    };

const sizeClasses: Record<NonNullable<LoadingProps['size']>, string> = {
  sm: 'h-20 w-20',
  md: 'h-28 w-28',
  lg: 'h-36 w-36',
};

const shapes: Shape[] = [
  {
    id: 'F4',
    type: 'rect',
    fill: '#d3c3b0',
    delay: 0,
    props: {
      x: 710.61,
      y: 169.04,
      width: 131.39,
      height: 131.93,
    },
  },
  {
    id: 'F3',
    type: 'polygon',
    fill: '#42865c',
    delay: 0.2,
    points:
      '182 668.41 290.4 668.41 290.4 771.98 398.24 771.98 398.24 868.77 606.81 868.77 606.13 974 388.42 974 182 768.67 182 668.41',
  },
  {
    id: 'F2',
    type: 'polygon',
    fill: '#ffbb09',
    delay: 0.4,
    points:
      '290.4 543.87 399.48 543.87 399.48 434.14 501.21 332.94 502.38 543.87 606.48 543.87 606.81 868.77 398.24 868.77 398.24 771.98 290.4 771.98 290.4 543.87',
  },
  {
    id: 'F1',
    type: 'polygon',
    fill: 'url(#linear-gradient)',
    delay: 0.6,
    points:
      '182 668.41 182 449.91 294.36 449.91 294.36 260.96 404.96 260.96 404.96 50 451.66 50 606.72 204.24 606.72 403.74 716.01 403.74 716.01 544.27 820.43 544.27 820.43 768.3 716.01 768.3 716.01 868.77 606.81 868.77 606.48 543.87 502.38 543.87 501.21 332.94 399.48 434.14 399.48 543.87 290.4 543.87 290.4 668.41 182 668.41',
  },
];

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay: number) => ({
    opacity: [0, 1, 1, 0.2, 0],
    scale: [0.9, 1, 1, 0.94, 0.9],
    transition: {
      duration: 2.8,
      delay,
      repeat: Infinity,
      repeatDelay: 0.4,
      times: [0, 0.2, 0.6, 0.85, 1],
    },
  }),
};

const pulseVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: [0, 0.5, 0],
    scale: [0.8, 1.1, 1.3],
    transition: {
      duration: 3.2,
      repeat: Infinity,
    },
  },
};

export function Loading({ className, size = 'md', text }: LoadingProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-6 text-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-br from-emerald-200/30 via-amber-200/25 to-orange-200/20 blur-3xl"
          initial="hidden"
          animate="visible"
          variants={pulseVariants}
        />
        <motion.svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Forest Fire logo loading indicator"
          className="relative h-full w-full drop-shadow-[0_10px_30px_rgba(16,185,129,0.35)]"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="309.64"
              y1="308.77"
              x2="661.36"
              y2="838.34"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f76135" />
              <stop offset="1" stopColor="#fb7e26" />
            </linearGradient>
          </defs>
          {shapes.map((shape) => {
            if (shape.type === 'rect') {
              return (
                <motion.rect
                  key={shape.id}
                  {...shape.props}
                  fill={shape.fill}
                  variants={shapeVariants}
                  initial="hidden"
                  animate="visible"
                  custom={shape.delay}
                />
              );
            }

            return (
              <motion.polygon
                key={shape.id}
                points={shape.points}
                fill={shape.fill}
                variants={shapeVariants}
                initial="hidden"
                animate="visible"
                custom={shape.delay}
              />
            );
          })}
        </motion.svg>
      </div>
      {text && <p className="text-sm font-medium text-slate-400">{text}</p>}
    </div>
  );
}
