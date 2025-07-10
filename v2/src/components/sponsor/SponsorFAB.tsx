'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { HeartHandshake, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { sponsorOptions, UPI_ID, UPI_NAME, type SponsorAction } from './sponsor.config';
import { SponsorOption } from './SponsorOption';
import UpiModal from './UpiModal';

const SponsorFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  const menuId = 'sponsor-fab-menu'; // ID for aria-controls

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
    open: { scale: 1.1, rotate: 135 }, // Rotate further for X
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      transition: {
        when: 'afterChildren', // Ensure children finish exiting first
        staggerChildren: 0.03,
        staggerDirection: -1, // Reverse stagger on close
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        when: 'beforeChildren', // Ensure parent animates before children
        staggerChildren: 0.06, // Slightly increased stagger
        delayChildren: 0.1, // Small delay before children start
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 20,
      x: 0,
      scale: 0.8,
      transition: { duration: 0.15 },
    },
    open: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 350, damping: 25 },
    },
  };

  return (
    <>
      <div ref={fabRef} className="fixed right-6 bottom-16 z-50 flex flex-col items-center gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={menuId} // Add ID for aria-controls
              className="flex flex-col items-center gap-3"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              aria-label="Sponsor options" // Label for the menu itself
            >
              {sponsorOptions.map((option) => (
                <motion.div key={option.id} variants={itemVariants}>
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
                whileHover={{ scale: 1.15 }} // Slightly more hover scale
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="default"
                  size="icon"
                  className={cn(
                    'h-14 w-14 overflow-hidden rounded-full shadow-lg transition-colors duration-200 ease-in-out', // Added overflow-hidden
                    isOpen
                      ? 'bg-error-container text-on-error-container hover:bg-destructive/90'
                      : 'bg-primary text-on-primary hover:bg-primary/90'
                  )}
                  onClick={toggleFab}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? menuId : undefined} // Control the menu
                  aria-label={isOpen ? 'Close support options' : 'Support Us'}
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={isOpen ? 'close' : 'heart'}
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      // Apply counter-rotation only when the icon is 'close' (X)
                      animate={{
                        opacity: 1,
                        rotate: isOpen ? -135 : 0, // Counter-rotate the X icon
                        scale: 1,
                      }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.25 }} // Slightly longer icon transition
                    >
                      {isOpen ? <X size={24} /> : <HeartHandshake size={24} />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={10}>
              <p>{isOpen ? 'Close' : 'Send some Support'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <UpiModal isOpen={isUpiModalOpen} onOpenChange={setIsUpiModalOpen} upiId={UPI_ID} upiName={UPI_NAME} />
    </>
  );
};

export default SponsorFAB;
