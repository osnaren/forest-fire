import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface StepDescriptor {
  title: string;
  description: string;
}

interface ToolStepperProps {
  steps: StepDescriptor[];
  activeStep: number;
}

type StepState = 'complete' | 'current' | 'upcoming';

function getStepState(index: number, activeStep: number): StepState {
  if (index < activeStep) {
    return 'complete';
  }

  if (index === activeStep) {
    return 'current';
  }

  return 'upcoming';
}

export function ToolStepper({ steps, activeStep }: ToolStepperProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="hidden h-1 w-full items-center justify-between lg:flex" aria-hidden="true">
        {steps?.map((step, index) => {
          const state = getStepState(index, activeStep);

          return (
            <motion.div
              key={step.title}
              className={cn(
                'h-1 flex-1 rounded-full',
                state === 'complete' && 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.45)]',
                state === 'current' && 'bg-emerald-400/70',
                state === 'upcoming' && 'bg-muted'
              )}
              initial={false}
              animate={{
                backgroundColor:
                  state === 'complete'
                    ? 'var(--color-emerald-500)'
                    : state === 'current'
                      ? 'rgba(52, 211, 153, 0.7)'
                      : 'var(--color-muted)',
              }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </div>
      {/* Mobile: compact single-step view with step-line and current step details */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center gap-4 px-2">
          <motion.div
            aria-hidden="true"
            className={cn('h-1 flex-1 rounded-full', activeStep > 0 ? 'bg-emerald-500' : 'bg-muted')}
            animate={{ backgroundColor: activeStep > 0 ? 'var(--color-emerald-500)' : 'var(--color-muted)' }}
          />

          <motion.div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border text-base font-semibold',
              'border-emerald-400 bg-emerald-400/20 text-emerald-200 shadow-inner'
            )}
            aria-hidden="true"
            key={activeStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {activeStep + 1}
          </motion.div>

          <motion.div
            aria-hidden="true"
            className={cn('h-1 flex-1 rounded-full', activeStep < steps.length - 1 ? 'bg-muted' : 'bg-emerald-500')}
            animate={{
              backgroundColor: activeStep < steps.length - 1 ? 'var(--color-muted)' : 'var(--color-emerald-500)',
            }}
          />
        </div>

        <motion.div
          className={cn('border-border/60 bg-card/60 rounded-xl border p-4 backdrop-blur')}
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-foreground/90 text-sm leading-tight font-semibold">{steps[activeStep]?.title}</p>
            <p className="text-muted-foreground text-xs leading-relaxed">{steps[activeStep]?.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Desktop / Tablet: full step cards */}
      <div className="hidden gap-4 md:grid md:grid-cols-3">
        {steps.map((step, index) => {
          const state = getStepState(index, activeStep);

          return (
            <motion.div
              key={step.title}
              className={cn(
                'border-border/60 bg-card/60 flex items-start gap-4 rounded-xl border p-4 backdrop-blur',
                state === 'current' && 'border-emerald-500/60 bg-emerald-500/5 shadow-lg shadow-emerald-500/10',
                state === 'complete' && 'border-emerald-500/40'
              )}
              aria-current={state === 'current'}
              animate={{
                borderColor:
                  state === 'current'
                    ? 'rgba(16, 185, 129, 0.6)'
                    : state === 'complete'
                      ? 'rgba(16, 185, 129, 0.4)'
                      : 'rgba(var(--color-border), 0.6)',
                backgroundColor: state === 'current' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(var(--color-card), 0.6)',
                scale: state === 'current' ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border text-base font-semibold',
                  state === 'complete' && 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
                  state === 'current' &&
                    'border-emerald-400 bg-emerald-400/20 text-emerald-200 shadow-inner shadow-emerald-400/20',
                  state === 'upcoming' && 'border-border text-muted-foreground'
                )}
                animate={{
                  scale: state === 'current' ? 1.1 : 1,
                }}
              >
                {index + 1}
              </motion.div>
              <div className="flex flex-col gap-1">
                <p className="text-foreground/90 text-sm leading-tight font-semibold">{step.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
