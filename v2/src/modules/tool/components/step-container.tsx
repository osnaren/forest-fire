import { AnimatePresence, motion } from 'motion/react';
import { ReactNode } from 'react';

interface StepContainerProps {
  step: string;
  children: ReactNode;
}

export function StepContainer({ step, children }: StepContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
