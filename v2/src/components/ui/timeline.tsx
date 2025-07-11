'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  phase: string;
  duration: string;
  description: string;
  achievements: string[];
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
}

export function Timeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={cn('w-full', className)} ref={containerRef}>
      <div ref={ref} className="relative">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex justify-start pt-10 md:gap-10 md:pt-20"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg md:left-3">
                <div className="h-4 w-4 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm" />
              </div>
              <div className="hidden md:block md:pl-20">
                <h3 className="mb-1 text-lg font-semibold text-emerald-400">{item.phase}</h3>
                <p className="text-sm text-gray-400">{item.duration}</p>
              </div>
            </div>

            <div className="relative w-full pr-4 pl-20 md:pl-4">
              <div className="mb-4 md:hidden">
                <h3 className="mb-1 text-lg font-semibold text-emerald-400">{item.phase}</h3>
                <p className="text-sm text-gray-400">{item.duration}</p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
                <p className="mb-4 text-gray-300">{item.description}</p>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start gap-2">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                      <span className="text-sm text-gray-400">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        <div
          style={{
            height: height + 'px',
          }}
          className="absolute top-0 left-8 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
