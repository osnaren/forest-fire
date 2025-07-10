import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Copy, Heart } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import upiqr from 'upiqr';
import type { UPIIntentParams } from 'upiqr/dist/types/upiqr';

interface UpiModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  upiId: string;
  upiName: string;
  currency?: string;
}

// Predefined donation amounts
const AMOUNTS = [
  { value: '49', label: '₹49' },
  { value: '99', label: '₹99' },
  { value: '199', label: '₹199' },
  { value: '499', label: '₹499' },
];

// Shared content component that will be used in both Dialog and Drawer
const UpiPaymentContent: React.FC<{
  upiId: string;
  upiName: string;
  currency: string;
  titleId: string;
  descriptionId: string;
}> = ({ upiId, upiName, currency }) => {
  // State for handling QR code
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isLoadingQr, setIsLoadingQr] = useState(false);

  // State for amount handling
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [note, setNote] = useState<string>('Support ShadySide App');

  // Compute the final amount to use
  const finalAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      toast.success('UPI ID copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy UPI ID.');
      console.error('Failed to copy text: ', err);
    }
  };

  // Generate QR code when necessary values change
  useEffect(() => {
    setIsLoadingQr(true);
    setQrCodeDataUrl(null);

    // Only include amount if it has a valid value
    const upiParams: UPIIntentParams = {
      payeeVPA: upiId,
      payeeName: upiName,
      currency: currency,
      transactionNote: note,
    };

    // Only add amount if a valid one is selected
    if (finalAmount && !isNaN(Number(finalAmount)) && Number(finalAmount) > 0) {
      upiParams.amount = finalAmount;
    }

    upiqr(upiParams)
      .then((res) => {
        setQrCodeDataUrl(res.qr);
        setIsLoadingQr(false);
      })
      .catch((err) => {
        console.error('Failed to generate UPI QR code:', err);
        toast.error('Could not generate QR code.');
        setIsLoadingQr(false);
      });
  }, [upiId, upiName, currency, note, finalAmount]);

  // Handle amount button click
  const handleAmountSelect = (amount: string) => {
    if (amount === selectedAmount) {
      // If clicking the already selected amount, deselect it
      setSelectedAmount('');
    } else {
      setSelectedAmount(amount);
      // Clear custom amount if a predefined amount is selected
      if (amount !== 'custom') {
        setCustomAmount('');
      }
    }
  };

  // Handle custom amount change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    if (value && value !== '0') {
      setSelectedAmount('custom');
    } else if (selectedAmount === 'custom') {
      setSelectedAmount('');
    }
  };

  // Handle note change
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  // Function to stop propagation of wheel events to prevent page scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col space-y-6" onWheel={handleWheel}>
      {/* QR Code Container */}
      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            'flex h-[232px] w-[232px] items-center justify-center rounded-lg p-4 shadow-md',
            'bg-surface-container-high'
          )}
        >
          {isLoadingQr && (
            <div className="flex flex-col items-center gap-2">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
              <span className="text-on-surface-variant text-sm">Generating QR...</span>
            </div>
          )}

          {qrCodeDataUrl && (
            <div className="rounded-md bg-white p-2">
              <Image
                src={qrCodeDataUrl}
                width={200}
                height={200}
                alt={`UPI QR Code for ${upiId}`}
                style={{ imageRendering: 'pixelated' }}
                unoptimized
                priority
              />
            </div>
          )}

          {!isLoadingQr && !qrCodeDataUrl && (
            <div className="text-error flex items-center gap-2 text-sm">
              <span>Failed to load QR code</span>
            </div>
          )}
        </div>

        {/* UPI ID Copy Section */}
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            value={upiId}
            readOnly
            className="bg-surface-container border-outline-variant flex-1"
            aria-label="UPI ID"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy UPI ID"
            className="border-outline hover:bg-surface-container-high"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Amount Selection & Note Container */}
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="quick-support" className="text-on-surface mb-2 block text-sm font-medium">
            Quick Support
          </label>
          <div id="quick-support" className="grid grid-cols-2 gap-2">
            {AMOUNTS.map((amount) => (
              <Button
                key={amount.value}
                type="button"
                variant={selectedAmount === amount.value ? 'default' : 'outline'}
                onClick={() => handleAmountSelect(amount.value)}
                className={cn(
                  'border-outline-variant hover:bg-primary-container',
                  selectedAmount === amount.value &&
                    'bg-primary-container text-on-primary-container hover:bg-primary-container/90'
                )}
              >
                {amount.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label htmlFor="custom-amount" className="text-on-surface mb-2 block text-sm font-medium">
            Custom Support
          </label>
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant text-lg">₹</span>
            <Input
              id="custom-amount"
              type="text"
              placeholder="Enter amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className={cn(
                'bg-surface-container border-outline-variant flex-1',
                selectedAmount === 'custom' && 'border-primary'
              )}
            />
            <Button
              type="button"
              variant={selectedAmount === 'custom' ? 'default' : 'outline'}
              onClick={() => handleAmountSelect('custom')}
              className={cn(
                'border-outline-variant hover:bg-primary-container',
                selectedAmount === 'custom' &&
                  'bg-primary-container text-on-primary-container hover:bg-primary-container/90'
              )}
            >
              Use
            </Button>
          </div>
        </div>

        {/* Note Field */}
        <div>
          <label htmlFor="note" className="text-on-surface mb-2 block text-sm font-medium">
            Note (optional)
          </label>
          <Input
            id="note"
            type="text"
            placeholder="Add a note"
            value={note}
            onChange={handleNoteChange}
            className="bg-surface-container border-outline-variant"
          />
          <p className="text-on-surface-variant mt-1 text-xs">This note will be visible to the recipient</p>
        </div>

        {/* Amount Selected Indicator */}
        {finalAmount && !isNaN(Number(finalAmount)) && Number(finalAmount) > 0 && (
          <div className="text-on-tertiary-container bg-tertiary-container mt-2 flex items-center gap-2 rounded-md p-2 text-sm">
            <Heart className="h-4 w-4" />
            <span>Thank you for your support of ₹{finalAmount}!</span>
          </div>
        )}
      </div>

      {/* UPI Apps Section */}
      <div className="text-on-surface-variant mt-2 flex flex-col items-center gap-2 text-xs">
        All UPI Apps supported
        <Image src="/upi-apps.png" alt="UPI Apps" width={50} height={50} className="w-24" />
      </div>
    </div>
  );
};

// Dialog version for desktop
const UpiDialog: React.FC<UpiModalProps> = ({ isOpen, onOpenChange, upiId, upiName, currency = 'INR' }) => {
  const titleId = 'upi-dialog-title';
  const descriptionId = 'upi-dialog-description';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-center text-xl">
            ❤️ Support via UPI
          </DialogTitle>
          <DialogDescription className="text-center">
            Scan the QR with any UPI app or copy the ID below. Thanks a ton for helping keep ShadySide cool! 😎
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-y-auto py-2">
          <UpiPaymentContent
            upiId={upiId}
            upiName={upiName}
            currency={currency}
            titleId={titleId}
            descriptionId={descriptionId}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Drawer version for mobile
const UpiDrawer: React.FC<UpiModalProps> = ({ isOpen, onOpenChange, upiId, upiName, currency = 'INR' }) => {
  const titleId = 'upi-drawer-title';
  const descriptionId = 'upi-drawer-description';

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] focus:outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">❤️ Support via UPI</DrawerTitle>
          <DrawerDescription>
            Scan the QR with any UPI app or copy the ID below. Thanks a ton for helping keep ShadySide cool! 😎
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-8">
          <UpiPaymentContent
            upiId={upiId}
            upiName={upiName}
            currency={currency}
            titleId={titleId}
            descriptionId={descriptionId}
          />
        </div>

        <DrawerFooter className="border-t pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// Main UpiModal component that decides which version to render
const UpiModal: React.FC<UpiModalProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? <UpiDialog {...props} /> : <UpiDrawer {...props} />;
};

export default UpiModal;
