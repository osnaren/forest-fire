import Image from 'next/image';
import React from 'react';
import { BsPaypal } from 'react-icons/bs';
import { SiBuymeacoffee, SiGithubsponsors } from 'react-icons/si';

// Action type definition
export type SponsorAction = { type: 'link'; href: string } | { type: 'modal'; modalId: 'upi' };

// Option configuration interface
export interface SponsorOptionConfig {
  label: string;
  icon: React.ReactNode;
  bgColor: string; // Made bgColor mandatory for consistency
  textColor: string; // Made textColor mandatory
  action: SponsorAction;
  id: string; // Added unique id for key prop
}

// UPI Constants
export const UPI_ID = '66naren-2@okicici';
export const UPI_NAME = 'Obuli Sai Naren';

// Sponsor Options Array
export const sponsorOptions: SponsorOptionConfig[] = [
  {
    id: 'bmc',
    label: 'Buy Me a Coffee',
    icon: <SiBuymeacoffee size={24} aria-hidden="true" />,
    bgColor: 'bg-[#FFDD00] hover:bg-[#FFDD00]/90',
    textColor: 'text-black',
    action: { type: 'link', href: 'https://www.buymeacoffee.com/osnaren' },
  },
  {
    id: 'github',
    label: 'GitHub Sponsors',
    icon: <SiGithubsponsors size={22} aria-hidden="true" />,
    bgColor: 'bg-[#db61a2] hover:bg-[#db61a2]/90',
    textColor: 'text-white',
    action: { type: 'link', href: 'https://github.com/sponsors/osnaren' },
  },
  {
    id: 'paypal',
    label: 'PayPal',
    icon: <BsPaypal size={24} aria-hidden="true" />,
    bgColor: 'bg-[#0070ba] hover:bg-[#0070ba]/90',
    textColor: 'text-white',
    action: { type: 'link', href: 'https://www.paypal.me/osnaren' },
  },
  {
    id: 'upi',
    label: 'Support via UPI',
    icon: <Image src="/upi-logo.svg" alt="" width={24} height={24} aria-hidden="true" />, // Slightly larger UPI icon
    bgColor: 'bg-[#e0e4dc] hover:bg-[#e0e4dc]/90',
    textColor: 'text-white',
    action: { type: 'modal', modalId: 'upi' },
  },
];
