'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { HeartHandshake, X } from 'lucide-react';
import { AnimatePresence, motion, Variants } from 'motion/react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { sponsorOptions, UPI_ID, UPI_NAME, type SponsorAction } from './sponsor.config';
import { SponsorOption } from './SponsorOption';
import UpiModal from './UpiModal';

const SponsorFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const toggleFab = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (action: SponsorAction, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (action.type === 'modal' && action.modalId === 'upi') {
      setIsUpiModalOpen(true);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const closeOnClickOutside = (event: MouseEvent) => {
      if (isOpen && fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', closeOnClickOutside);
    };
  }, [isOpen]);

  const fabVariants: Variants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1.1, rotate: 0 },
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.08,
        delayChildren: 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  };

  return (
    <>
      <div ref={fabRef} className="fixed right-6 bottom-6 z-40 flex flex-col items-center gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={menuId}
              className="flex flex-col items-center gap-3 pb-2"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              role="menu"
              aria-label="Sponsor options"
            >
              {sponsorOptions.map((option) => (
                <motion.div key={option.id} variants={itemVariants} role="menuitem">
                  <SponsorOption
                    label={option.label}
                    icon={option.icon}
                    bgColor={option.bgColor}
                    textColor={option.textColor}
                    href={option.action.type === 'link' ? option.action.href : undefined}
                    onClick={option.action.type === 'modal' ? (e) => handleOptionClick(option.action, e) : undefined}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={fabVariants}
                animate={isOpen ? 'open' : 'closed'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="default"
                  size="icon"
                  className={cn(
                    'h-14 w-14 rounded-full shadow-xl transition-all duration-300',
                    isOpen
                      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 rotate-90'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  onClick={toggleFab}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  aria-controls={menuId}
                  aria-label={isOpen ? 'Close support menu' : 'Open support menu'}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isOpen ? 'close' : 'open'}
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? <X className="h-6 w-6" /> : <HeartHandshake className="h-6 w-6" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={10}>
              <p>{isOpen ? 'Close' : 'Support the Project'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <UpiModal isOpen={isUpiModalOpen} onOpenChange={setIsUpiModalOpen} upiId={UPI_ID} upiName={UPI_NAME} />
    </>
  );
};

export default SponsorFAB;
