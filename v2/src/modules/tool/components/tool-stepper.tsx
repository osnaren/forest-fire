import { cn } from '@/lib/utils';

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
            <div
              key={step.title}
              className={cn(
                'h-1 flex-1 rounded-full transition-all duration-500',
                state === 'complete' && 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.45)]',
                state === 'current' && 'bg-emerald-400/70',
                state === 'upcoming' && 'bg-muted'
              )}
            />
          );
        })}
      </div>
      {/* Mobile: compact single-step view with step-line and current step details */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center gap-4 px-2">
          <div
            aria-hidden="true"
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              activeStep > 0 ? 'bg-emerald-500' : 'bg-muted'
            )}
          />

          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border text-base font-semibold',
              'border-emerald-400 bg-emerald-400/20 text-emerald-200 shadow-inner'
            )}
            aria-hidden="true"
          >
            {activeStep + 1}
          </div>

          <div
            aria-hidden="true"
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              activeStep < steps.length - 1 ? 'bg-muted' : 'bg-emerald-500'
            )}
          />
        </div>

        <div className={cn('border-border/60 bg-card/60 rounded-xl border p-4 backdrop-blur')}> 
          <div className="flex flex-col gap-1">
            <p className="text-foreground/90 text-sm font-semibold leading-tight">{steps[activeStep]?.title}</p>
            <p className="text-muted-foreground text-xs leading-relaxed">{steps[activeStep]?.description}</p>
          </div>
        </div>
      </div>

      {/* Desktop / Tablet: full step cards */}
      <div className="hidden md:grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => {
          const state = getStepState(index, activeStep);

          return (
            <div
              key={step.title}
              className={cn(
                'border-border/60 bg-card/60 flex items-start gap-4 rounded-xl border p-4 backdrop-blur transition-all duration-300',
                state === 'current' && 'border-emerald-500/60 bg-emerald-500/5 shadow-lg shadow-emerald-500/10',
                state === 'complete' && 'border-emerald-500/40'
              )}
              aria-current={state === 'current'}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border text-base font-semibold transition-all duration-300',
                  state === 'complete' && 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
                  state === 'current' && 'border-emerald-400 bg-emerald-400/20 text-emerald-200 shadow-inner shadow-emerald-400/20 scale-105',
                  state === 'upcoming' && 'border-border text-muted-foreground'
                )}
              >
                {index + 1}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-foreground/90 text-sm font-semibold leading-tight">{step.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
