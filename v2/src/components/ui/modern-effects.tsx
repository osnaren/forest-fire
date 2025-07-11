/**
 * Modern Effects Components
 * Animated gradient text and hover background components
 */

'use client';

import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion, useMotionValue, useSpring } from 'framer-motion';
import * as React from 'react';
import { ReactNode } from 'react';

export function AnimatedGradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40',
        className
      )}
    >
      <div
        className={`animate-gradient absolute inset-0 block h-full w-full [border-radius:inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] ![mask-composite:subtract] p-[1px] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />
      {children}
    </div>
  );
}

/**
 * Hover Background component with animated objects
 * Interactive background with parallax effects
 */

type HoverBackgroundProps = HTMLMotionProps<'div'> & {
  objectCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children?: React.ReactNode;
  colors?: {
    background?: string;
    objects?: string[];
    glow?: string;
  };
};

export function HoverBackground({
  className,
  objectCount = 12,
  children,
  colors = {},
  ...props
}: HoverBackgroundProps) {
  const {
    background = 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    objects = [
      'bg-emerald-400/20',
      'bg-cyan-400/20',
      'bg-amber-400/20',
      'bg-orange-400/20',
      'bg-red-400/20',
      'bg-rose-400/20',
    ],
    glow = 'shadow-emerald-400/50',
  } = colors;

  const [isHovered, setIsHovered] = React.useState(false);

  // Mouse position tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth parallax with slower exit
  const springX = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
    restSpeed: 0.1,
    restDelta: 0.1,
  });
  const springY = useSpring(mouseY, {
    stiffness: 300,
    damping: 30,
    restSpeed: 0.1,
    restDelta: 0.1,
  });

  const animatedObjects = React.useMemo(
    () =>
      Array.from({ length: objectCount }, (_, i) => {
        const shape = Math.random() > 0.5 ? 'circle' : 'square';
        return {
          id: i,
          x: Math.random() * 90 + 5, // 5-95% to avoid edges
          y: Math.random() * 90 + 5,
          size: Math.random() * 60 + 20, // 20-80px
          color: objects[i % objects.length],
          delay: Math.random() * 2,
          shape,
          floatDirection: Math.random() > 0.5 ? 1 : -1,
          breathDuration: Math.random() * 3 + 3, // 3-6 seconds
          parallaxStrength: Math.random() * 0.5 + 0.3, // 0.3-0.8 for more varied parallax depth
          baseRotation: Math.random() * 360, // Random starting rotation offset
        };
      }),
    [objectCount, objects]
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate mouse position relative to center (-1 to 1)
    const x = (event.clientX - rect.left - centerX) / centerX;
    const y = (event.clientY - rect.top - centerY) / centerY;

    mouseX.set(x * 15); // Slightly reduced parallax range
    mouseY.set(y * 15);
  };

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    // Smooth return to center
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      data-slot="hover-background"
      className={cn('relative size-full overflow-hidden', background, className)}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
      {...props}
    >
      {/* Subtle ambient glow */}
      <motion.div
        className="bg-gradient-radial absolute inset-0 from-white/5 via-transparent to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated Objects */}
      {animatedObjects.map((obj) => (
        <motion.div
          key={obj.id}
          className={cn(
            'absolute border border-white/10 backdrop-blur-sm',
            obj.color,
            obj.shape === 'circle' ? 'rounded-full' : 'rotate-45 rounded-lg'
          )}
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: obj.size,
            height: obj.size,
            // Apply parallax with individual object strength
            x: springX.get() * obj.parallaxStrength,
            y: springY.get() * obj.parallaxStrength,
          }}
          initial={{
            scale: 0.6,
            opacity: 0.4,
            rotate: obj.baseRotation,
          }}
          animate={{
            // Default state animations - breathing with base rotation offset
            scale: [0.6, 0.8, 0.6],
            opacity: [0.4, 0.6, 0.4],
            rotate:
              obj.shape === 'circle'
                ? [obj.baseRotation, obj.baseRotation + 10, obj.baseRotation]
                : [obj.baseRotation, obj.baseRotation + 5, obj.baseRotation],
            y: [0, obj.floatDirection * 15, 0],
            x: [0, obj.floatDirection * 8, 0],
          }}
          transition={{
            duration: obj.breathDuration,
            delay: obj.delay,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          whileHover={{
            scale: 1.5,
            boxShadow: `0 0 30px ${glow.replace('shadow-', '').replace('/50', '')}`,
          }}
        />
      ))}

      {/* Floating Particles on Hover */}
      {isHovered && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute h-1 w-1 rounded-full bg-white/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -50, -100],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 size-full">{children}</div>
    </motion.div>
  );
}
