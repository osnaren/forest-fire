'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animated?: boolean;
}

export function GradientText({
  children,
  className,
  colors = ['from-primary', 'via-primary', 'to-accent'],
  animated = true,
}: GradientTextProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const textContent = (
    <span
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        colors.join(' '),
        animated && 'animate-gradient',
        className
      )}
    >
      {children}
    </span>
  );

  if (!isMounted) {
    return textContent;
  }

  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent will-change-transform',
        colors.join(' '),
        animated && 'animate-gradient',
        className
      )}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({ text, className, delay = 0, speed = 50 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, isMounted]);

  useEffect(() => {
    if (!isStarted || !isMounted) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [displayedText, text, speed, isStarted, isMounted]);

  if (!isMounted) {
    return <span className={cn('relative', className)}>{text}</span>;
  }

  return (
    <span className={cn('relative will-change-contents', className)}>
      {displayedText}
      {isStarted && displayedText.length < text.length && (
        <motion.span 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ duration: 0.8, repeat: Infinity }} 
          className="ml-1 text-primary"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxElement({ children, className, speed = 0.5 }: ParallaxElementProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div className={cn(className)} style={{ transform: `translateY(${offsetY}px)` }}>
      {children}
    </div>
  );
}

interface MorphingShapeProps {
  className?: string;
  size?: number;
  colorVar?: string;
  speed?: number;
}

export function MorphingShape({ className, size = 100, colorVar = 'primary', speed = 3 }: MorphingShapeProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shapeContent = (
    <div className={cn('relative will-change-transform', className)} style={{ width: size, height: size }}>
      <div className={cn('absolute inset-0 rounded-full opacity-20', `bg-${colorVar}`)} />
    </div>
  );

  if (!isMounted) {
    return shapeContent;
  }

  return (
    <motion.div className={cn('relative will-change-transform', className)} style={{ width: size, height: size }}>
      <motion.div
        className={cn('absolute inset-0 rounded-full opacity-20', `bg-${colorVar}`)}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ['50%', '30%', '50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

interface ScrollProgressProps {
  className?: string;
  colorVar?: string;
}

export function ScrollProgress({ className, colorVar = 'primary' }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  if (!isMounted) {
    return <div className={cn('fixed top-0 left-0 z-50 h-1', className)} />;
  }

  return (
    <motion.div
      className={cn('fixed top-0 left-0 z-50 h-1', `bg-${colorVar}`, className)}
      style={{
        width: `${scrollProgress}%`,
        boxShadow: `0 0 10px hsl(var(--${colorVar}))`,
      }}
      initial={{ width: 0 }}
      animate={{ width: `${scrollProgress}%` }}
      transition={{ duration: 0.1 }}
    />
  );
}

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  glowColorVar?: string;
  rotateOnHover?: boolean;
}

export function HoverCard({ children, className, glowColorVar = 'primary', rotateOnHover = false }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardContent = (
    <div className={cn('relative cursor-pointer will-change-transform', className)}>
      <div className="absolute inset-0 rounded-lg transition-shadow duration-300" />
      {children}
    </div>
  );

  if (!isMounted) {
    return cardContent;
  }

  return (
    <motion.div
      className={cn('relative cursor-pointer will-change-transform', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        y: -5,
        rotateY: rotateOnHover ? 5 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isHovered 
            ? `0 20px 40px hsl(var(--${glowColorVar}) / 0.25)` 
            : `0 5px 15px hsl(var(--${glowColorVar}) / 0.1)`,
        }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}
