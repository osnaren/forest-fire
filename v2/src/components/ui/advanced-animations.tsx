import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animated?: boolean;
}

export function GradientText({ 
  children, 
  className, 
  colors = ['from-emerald-400', 'via-emerald-500', 'to-amber-400'],
  animated = true 
}: GradientTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.span
      className={cn(
        'text-transparent bg-clip-text bg-gradient-to-r',
        colors.join(' '),
        animated && 'animate-gradient',
        className
      )}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated && isVisible ? { opacity: 1, y: 0 } : {}}
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

export function TypewriterText({ 
  text, 
  className, 
  delay = 0, 
  speed = 50 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [displayedText, text, speed, isStarted]);

  return (
    <span className={cn('relative', className)}>
      {displayedText}
      {isStarted && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1"
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

export function ParallaxElement({ 
  children, 
  className, 
  speed = 0.5 
}: ParallaxElementProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      className={cn(className)}
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      {children}
    </div>
  );
}

interface MorphingShapeProps {
  className?: string;
  size?: number;
  color?: string;
  speed?: number;
}

export function MorphingShape({ 
  className, 
  size = 100, 
  color = '#10b981', 
  speed = 3 
}: MorphingShapeProps) {
  return (
    <motion.div
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        style={{ backgroundColor: color }}
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
      <motion.div
        className="absolute inset-2 rounded-full opacity-40"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          borderRadius: ['30%', '50%', '30%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </motion.div>
  );
}

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({ 
  className, 
  color = '#10b981' 
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={cn('fixed top-0 left-0 z-50 h-1', className)}
      style={{ 
        width: `${scrollProgress}%`,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
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
  glowColor?: string;
  rotateOnHover?: boolean;
}

export function HoverCard({ 
  children, 
  className, 
  glowColor = '#10b981',
  rotateOnHover = false 
}: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn('relative cursor-pointer', className)}
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
        damping: 20 
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isHovered 
            ? `0 20px 40px ${glowColor}40` 
            : `0 5px 15px ${glowColor}20`,
        }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}
