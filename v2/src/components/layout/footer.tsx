'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PulsingDot } from '@/components/ui/interactive-elements';
import { footerConfig, navConfig } from '@/config/pages';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialIcons = {
  github: FaGithub,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-border/50 bg-background/80 relative border-t backdrop-blur-md',
        'before:absolute before:inset-0 before:-z-10',
        'before:from-background/60 before:to-muted/30 before:bg-linear-to-br'
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <motion.div
            className="space-y-6 md:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Enhanced Logo */}
            <Link href={navConfig.brand.href} className="group flex items-center space-x-3">
              <motion.div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl',
                  'ring-offset-background shadow-lg ring-2 shadow-emerald-500/25 ring-emerald-500/20 ring-offset-2'
                )}
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {navConfig.brand.logo}
              </motion.div>
              <div>
                <motion.span
                  className={cn(
                    'font-display block text-xl font-bold',
                    'from-foreground to-foreground/80 bg-linear-to-r bg-clip-text text-transparent',
                    'transition-all duration-200 group-hover:from-emerald-500 group-hover:to-emerald-600'
                  )}
                  whileHover={{ x: 2 }}
                >
                  {footerConfig.brand.name}
                </motion.span>
              </div>
            </Link>

            {/* Description */}
            <p className="text-muted-foreground max-w-md leading-relaxed">{footerConfig.brand.description}</p>

            {/* Model Status */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <PulsingDot size="sm" color="emerald" />
                <span className="text-muted-foreground text-sm">
                  Model {footerConfig.model.version} • {footerConfig.model.accuracy} accuracy
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {footerConfig.model.status}
              </Badge>
            </div>

            {/* Performance Metrics */}
            <div className="border-border/50 bg-muted/30 grid grid-cols-3 gap-4 rounded-xl border p-4">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-500">{footerConfig.performance.uptime}</div>
                <div className="text-muted-foreground text-xs">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-500">{footerConfig.performance.responseTime}</div>
                <div className="text-muted-foreground text-xs">Response</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">{footerConfig.performance.requests}</div>
                <div className="text-muted-foreground text-xs">Requests</div>
              </div>
            </div>
          </motion.div>

          {/* Project Links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">Project</h3>
            <ul className="space-y-3">
              {footerConfig.links.project.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} description={link.description}>
                    {link.text}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources & Connect */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">Resources</h3>
              <ul className="space-y-3">
                {footerConfig.links.resources.map((link) => (
                  <li key={link.text}>
                    {(link as { comingSoon?: boolean }).comingSoon ? (
                      <ComingSoonLink description={link.description}>{link.text}</ComingSoonLink>
                    ) : (
                      <FooterLink href={link.href} description={link.description} isExternal={link.external}>
                        {link.text}
                      </FooterLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">Connect</h3>
              <div className="flex gap-2">
                {footerConfig.links.connect.map((link) => {
                  const IconComponent = socialIcons[link.text.toLowerCase() as keyof typeof socialIcons];
                  return (
                    <motion.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0">
                        <Link
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn('text-muted-foreground', 'transition-colors duration-200')}
                        >
                          {IconComponent && <IconComponent className="h-4 w-4" />}
                          <span className="sr-only">{link.text}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className={cn(
            'mt-12 flex flex-col items-center justify-between gap-4',
            'border-border/50 border-t pt-8',
            'sm:flex-row sm:gap-0'
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} {footerConfig.copyright.text}{' '}
              <span className="text-foreground font-medium">{footerConfig.copyright.name}</span>
            </p>
            <p className="text-muted-foreground/80 text-xs">{footerConfig.copyright.additionalText}</p>
          </div>

          {/* Legal Links */}
          <div className="text-muted-foreground flex gap-6 text-sm">
            {footerConfig.links.legal?.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                {link.text}
              </Link>
            ))}
          </div>

          {/* Tagline */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">{footerConfig.brand.tagline.text}</span>
            <motion.span
              className="text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 3,
              }}
            >
              {footerConfig.brand.tagline.emoji}
            </motion.span>
            <span className="text-muted-foreground font-emoji text-sm">{footerConfig.brand.tagline.location}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  description,
  isExternal = false,
}: {
  href: string;
  children: React.ReactNode;
  description?: string;
  isExternal?: boolean;
}) {
  return (
    <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className={cn(
          'group flex items-start gap-2 text-sm transition-colors duration-200',
          'text-muted-foreground cursor-pointer hover:text-emerald-500'
        )}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <div className="flex flex-col">
          <span className="font-medium">{children}</span>
          {description && <span className="text-muted-foreground/70 mt-0.5 text-xs">{description}</span>}
        </div>
        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    </motion.div>
  );
}

function ComingSoonLink({ children, description }: { children: React.ReactNode; description?: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col">
        <span className="text-muted-foreground/60 cursor-not-allowed text-sm font-medium">{children}</span>
        {description && <span className="text-muted-foreground/50 mt-0.5 text-xs">{description}</span>}
      </div>
      <Badge variant="outline" className="border-amber-500/20 bg-amber-500/10 text-xs text-amber-600">
        Coming Soon
      </Badge>
    </div>
  );
}
