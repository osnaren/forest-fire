import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';

interface SponsorOptionProps {
  href?: string;
  label: string;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SponsorOption: React.FC<SponsorOptionProps> = ({
  href,
  label,
  icon,
  bgColor = 'bg-secondary hover:bg-secondary/90',
  textColor = 'text-secondary-foreground',
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
  onClick,
}) => {
  const commonProps = {
    'aria-label': label,
    className: cn(
      'flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all hover:scale-110 focus:outline-none',
      bgColor,
      textColor,
      className
    ),
  };

  const TriggerElement = onClick ? (
    <button type="button" {...commonProps} onClick={onClick}>
      {icon}
    </button>
  ) : (
    <a href={href} target={target} rel={rel} {...commonProps}>
      {icon}
    </a>
  );

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{TriggerElement}</TooltipTrigger>
        <TooltipContent side="left" sideOffset={5}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
