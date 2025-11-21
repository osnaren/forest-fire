/**
 * Page configuration for Forest Fire Classifier v2
 * Centralized configuration for copy, links, and settings
 */

import Logo from '@visual/logo';
import { FaGithub, FaInstagram, FaLinkedin, FaUserLock } from 'react-icons/fa';
import { GiStrong, GiThrustBend } from 'react-icons/gi';
import { LuImage, LuImageUp } from 'react-icons/lu';
import { PiPackageFill, PiPlugsConnectedLight, PiPlugsLight } from 'react-icons/pi';
import { TbBrandOpenSourceFilled, TbEyeBolt } from 'react-icons/tb';

export const siteConfig = {
  name: 'Forest Fire Classifier',
  version: 'v2',
  description: 'Professional-grade wildfire detection powered by advanced machine learning',
  url: 'https://fire.osnaren.com',
  author: {
    name: 'Obuli Sai Naren',
    nickname: 'osnaren',
    labsName: 'osLabs',
    email: '66naren@gmail.com',
    twitter: '@osnaren',
    github: 'https://github.com/osnaren',
  },
  social: {
    github: 'https://github.com/osnaren/ForestFire',
    instagram: 'https://instagram.com/osnaren',
    linkedin: 'https://linkedin.com/in/osnaren',
    twitter: 'https://x.com/osnaren',
  },
};

export const homeConfig = {
  /* -------------------------------------------------- */
  /*  HERO                                              */
  /* -------------------------------------------------- */
  hero: {
    badge: {
      text: 'Real-time Detection',
      color: 'primary',
    },
    title: {
      main: 'Forest ',
      classes: ['Fire', 'No Fire', 'Smoke', 'Smoke+Fire'],
      accent: 'Classifier v2',
    },
    description:
      'Upload a forest image and get an instant verdict — fire, smoke, or clear. Runs right in your browser; no sign-up, no wait.',
    cta: {
      primary: {
        text: 'Try the Classifier',
        href: '/tool',
      },
      secondary: {
        text: 'Learn More',
        href: '/about',
      },
    },
  },

  /* -------------------------------------------------- */
  /*  STATS                                             */
  /* -------------------------------------------------- */
  stats: {
    badge: {
      text: 'Performance Stats',
      color: 'emerald',
    },
    title: 'Performance at a Glance',
    items: [
      {
        value: 94.2,
        suffix: '%',
        label: 'Accuracy',
        description: 'Validation set of 380 images',
      },
      {
        value: 500,
        suffix: 'ms',
        label: 'Avg. Latency',
        description: 'Client-side prediction time',
      },
      {
        value: 4,
        suffix: '',
        label: 'Classes',
        description: 'Fire, Smoke, Fire+Smoke, No Fire',
      },
    ],
  },

  /* -------------------------------------------------- */
  /*  FEATURES                                          */
  /* -------------------------------------------------- */
  features: {
    title: 'Built for Real-World Use',
    subtitle: 'Lightweight, privacy-first, and open-source',
    items: [
      {
        emoji: '⚡',
        icon: <TbEyeBolt className="size-6" />,
        title: 'Real-time Detection',
        description: 'Sub-second analysis directly in your browser — vital seconds saved in early response.',
      },
      {
        emoji: '🍃',
        icon: <PiPackageFill className="size-6" />,
        title: 'Lightweight Web Model',
        description: 'Teachable-Machine MobileNet distilled to <5 MB, so it loads even on 3G.',
      },
      {
        emoji: '🔐',
        icon: <FaUserLock className="size-6" />,
        title: 'Privacy-First',
        description: 'Images stay on-device by default; no cloud upload needed.',
      },
      {
        emoji: '🔀',
        icon: <GiThrustBend className="size-6" />,
        title: 'Flexible Deployment',
        description: 'Run client-side or call the optional rate-limited API for server inference.',
      },
      {
        emoji: '📊',
        icon: <GiStrong className="size-6" />,
        title: 'Confidence Scores',
        description: 'See class probabilities to gauge how certain the model is.',
      },
      {
        emoji: '🛠️',
        icon: <TbBrandOpenSourceFilled className="size-6" />,
        title: 'Open Source',
        description: 'MIT-licensed codebase — fork it, improve it, or deploy on your own edge devices.',
      },
    ],
  },

  /* -------------------------------------------------- */
  /*  FINAL CTA                                         */
  /* -------------------------------------------------- */
  cta: {
    title: 'Ready to Detect Wildfires?',
    description:
      'Drop in an image now or dive into the code — this project is built with care for rapid fire prevention.',
    primary: {
      text: 'Upload Image',
      href: '/tool',
      icon: <LuImage className="size-5" />,
      hoverIcon: <LuImageUp className="size-5" />,
    },
    secondary: {
      text: 'View API',
      href: '/api-docs',
      icon: <PiPlugsLight className="size-5" />,
      hoverIcon: <PiPlugsConnectedLight className="size-5" />,
    },
    indicators: [
      { label: 'Real-time Processing', color: 'emerald' },
      { label: 'High Accuracy', color: 'amber' },
      { label: 'Open Source', color: 'red' },
    ],
  },
};

export const aboutConfig = {
  hero: {
    title: 'From Dorm Room to Deployment',
    description:
      'What started as a 6th-semester college project has evolved into a professional AI showcase. Saving forests, one pixel at a time.',
  },
  story: {
    title: 'The Origin Story',
    content: [
      "It was 2020. The world was in lockdown, the deadlines were tight, and I needed a 6th-semester project that wasn't just another 'To-Do List' app.",
      'I wanted to build something with real-world impact. Forest fires were devastating ecosystems globally, and I wondered: could a simple web cam and some AI help catch them early? Armed with a dataset and a lot of determination, I dove into the world of Computer Vision.',
      'Fast forward to today: The code is cleaner, the UI is snappier (thanks, Next.js!), and the model is smarter. But the core mission remains the same: leveraging technology to protect our planet.',
    ],
  },
  techStack: {
    title: 'The Arsenal',
    items: [
      {
        name: 'TensorFlow.js',
        description: 'The brain behind the operation. Runs the model directly in your browser.',
        category: 'AI / ML',
        icon: 'https://img.icons8.com/color/96/tensorflow.png',
      },
      {
        name: 'Next.js 16',
        description: 'The muscle. Server-side rendering, routing, and pure speed.',
        category: 'Framework',
        icon: 'https://img.icons8.com/color/96/nextjs.png',
      },
      {
        name: 'TypeScript',
        description: 'The safety net. Catching bugs before they catch fire.',
        category: 'Language',
        icon: 'https://img.icons8.com/color/96/typescript.png',
      },
      {
        name: 'Tailwind CSS',
        description: 'The stylist. Making sure we look good while saving the world.',
        category: 'Styling',
        icon: 'https://img.icons8.com/color/96/tailwindcss.png',
      },
      {
        name: 'Framer Motion',
        description: 'The magic. Smooth animations that make you go "ooh".',
        category: 'Animation',
        icon: 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/96/external-framer-the-only-tool-you-need-to-create-interactive-designs-for-any-platform-logo-bold-tal-revivo.png',
      },
      {
        name: 'Vercel',
        description: 'The launchpad. Deploying to the edge with a single git push.',
        category: 'Infrastructure',
        icon: 'https://img.icons8.com/ios-filled/100/vercel.png',
      },
    ],
  },
  metrics: {
    title: 'By The Numbers',
    items: [
      {
        label: 'Model Accuracy',
        value: '94.2',
        unit: '%',
        description: 'On validation set',
      },
      {
        label: 'Caffeine Intake',
        value: '∞',
        unit: '',
        description: 'Cups of coffee',
      },
      {
        label: 'Semester',
        value: '6th',
        unit: '',
        description: 'When it started',
      },
      {
        label: 'Stack Overflow',
        value: '10k+',
        unit: '',
        description: 'Tabs opened',
      },
    ],
  },
  journey: {
    title: 'The Timeline',
    items: [
      {
        phase: 'The Spark (Sem 6)',
        duration: '2020',
        description: 'The initial idea. Scouring Kaggle for datasets and training the first clunky Python model.',
        achievements: ['Idea conceived', 'Dataset found', 'First prototype'],
      },
      {
        phase: 'The Paper',
        duration: '2023',
        description:
          'Refining the methodology. "Learning without Forgetting" became the core research focus. Published in Fire Ecology.',
        achievements: ['Research published', 'Methodology refined', 'Peer reviewed'],
      },
      {
        phase: 'The Rewrite (v2)',
        duration: '2024',
        description:
          'Ditching the old HTML/JS for a modern Next.js stack. Better UI, faster inference, and actual type safety.',
        achievements: ['Next.js migration', 'UI overhaul', 'Performance boost'],
      },
      {
        phase: 'The Future',
        duration: 'Beyond',
        description:
          'Adding real-time satellite data, edge deployment support, and maybe a dark mode that is actually dark.',
        achievements: ['Global domination', 'Saving more trees'],
      },
    ],
  },
  connect: {
    title: 'Stalk Me (Professionally)',
    description: 'Like what you see? Want to hire me? Or just want to argue about which JS framework is best?',
    links: [
      {
        text: 'GitHub',
        href: siteConfig.social.github,
        icon: <FaGithub />,
      },
      {
        text: 'LinkedIn',
        href: siteConfig.social.linkedin,
        icon: <FaLinkedin />,
      },
      {
        text: 'Instagram',
        href: siteConfig.social.instagram,
        icon: <FaInstagram />,
      },
    ],
  },
};

export const navConfig = {
  brand: {
    name: 'Forest Fire Classifier',
    shortName: 'FF Classifier',
    icon: '🔥',
    logo: <Logo />,
    href: '/',
    description: 'AI-powered wildfire detection',
  },
  main: [
    {
      title: 'Home',
      href: '/',
      description: 'Main classifier tool',
    },
    {
      title: 'About',
      href: '/about',
      description: 'Project story & tech stack',
    },
    {
      title: 'Research',
      href: '/research',
      description: 'Technical details & methodology',
    },
    {
      title: 'API Docs',
      href: '/api-docs',
      description: 'Developer documentation',
    },
  ],
  mobile: [
    {
      title: 'Home',
      href: '/',
      description: 'Main classifier tool',
    },
    {
      title: 'About',
      href: '/about',
      description: 'Project story & tech stack',
    },
    {
      title: 'Research',
      href: '/research',
      description: 'Technical details & methodology',
    },
    {
      title: 'API Docs',
      href: '/api-docs',
      description: 'Developer documentation',
    },
  ],
  cta: {
    primary: {
      text: 'Try Classifier',
      href: '/tool',
      variant: 'default' as const,
    },
    secondary: {
      text: 'View Docs',
      href: '/api-docs',
      variant: 'outline' as const,
    },
  },
};

export const footerConfig = {
  brand: {
    name: 'Forest Fire Classifier',
    description: 'Real-time wildfire detection powered by advanced machine learning. From research to production.',
    tagline: {
      text: 'Made with',
      emoji: '🧡🤍💚',
      location: 'in 🇮🇳',
    },
  },
  links: {
    project: [
      { text: 'About', href: '/about', description: 'Project story & tech stack' },
      { text: 'Research', href: '/research', description: 'Technical details & methodology' },
      { text: 'API Docs', href: '/api-docs', description: 'Developer documentation' },
    ],
    connect: [
      { text: 'GitHub', href: siteConfig.social.github, external: true },
      { text: 'Twitter', href: siteConfig.social.twitter, external: true },
      { text: 'LinkedIn', href: siteConfig.social.linkedin, external: true },
    ],
    resources: [
      { text: 'Live Wildfire Map', href: '/map', description: 'Real-time wildfire tracking' },
      { text: 'Download Model', href: '/model', description: 'TensorFlow.js model files', comingSoon: true },
      {
        text: 'Research Paper',
        href: 'https://fireecology.springeropen.com/articles/10.1186/s42408-022-00165-0',
        description: 'Academic publication',
        external: true,
      },
    ],
    legal: [
      { text: 'Privacy Policy', href: '/privacy', description: 'Data handling practices' },
      { text: 'Terms of Service', href: '/terms', description: 'Usage terms' },
    ],
  },
  model: {
    status: 'Active',
    version: 'v2.1',
    lastUpdated: '2024-01-15',
    accuracy: '94.2%',
  },
  performance: {
    uptime: '99.9%',
    responseTime: '< 500ms',
    requests: '10k+',
  },
  copyright: {
    text: 'Built by 🏗️',
    name: siteConfig.author.labsName,
    year: new Date().getFullYear(),
    additionalText: '- with Next.js, TensorFlow.js, and lots of ☕.',
  },
};

export const mapConfig = {
  hero: {
    title: 'Live Wildfire Map',
    description:
      'Real-time tracking of active wildfires around the world. Stay informed about current fire activity and weather conditions.',
    badge: {
      text: 'Live Data',
      color: 'red',
    },
  },
  features: [
    {
      title: 'Real-time Updates',
      description: 'Live data from NASA FIRMS and other satellite sources',
      icon: '🛰️',
    },
    {
      title: 'Weather Integration',
      description: 'Current weather conditions and fire danger ratings',
      icon: '🌡️',
    },
    {
      title: 'Historical Data',
      description: 'View fire patterns and trends over time',
      icon: '📊',
    },
  ],
};

export const researchConfig = {
  hero: {
    title: 'Research & Methodology',
    description:
      'Exploring advanced deep learning techniques for robust forest fire and smoke detection. From dataset curation to "Learning without Forgetting".',
  },
  dataset: {
    title: 'Forest Fire C4 Dataset',
    description:
      'A comprehensive, balanced dataset designed for environmental monitoring and fire detection tasks. Curated to handle complex scenarios like distinguishing smoke from cloud cover.',
    stats: [
      { label: 'Total Images', value: '4,823' },
      { label: 'Classes', value: '4' },
      { label: 'Image Size', value: '250x250' },
      { label: 'Format', value: 'JPEG' },
    ],
    classes: [
      { name: 'Fire', description: 'Visible flames and active fire fronts' },
      { name: 'No Fire', description: 'Clear forest, vegetation, and non-fire scenes' },
      { name: 'Smoke', description: 'Plumes and early-stage smoldering without flames' },
      { name: 'SmokeFire', description: 'Complex scenes containing both smoke and fire' },
    ],
    links: {
      kaggle: 'https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4',
    },
  },
  paper: {
    title: 'Learning without Forgetting',
    subtitle: 'Published in Fire Ecology (Springer Open)',
    abstract:
      'Our core research focuses on "Learning without Forgetting" (LwF), a deep learning paradigm that enables models to adapt to new tasks—such as distinguishing between similar visual patterns like smoke and fog—without losing proficiency in previously learned categories. This approach is crucial for deploying robust AI in dynamic natural environments where conditions constantly evolve.',
    citation:
      'Naren, O.S. Forest fire and smoke detection using deep learning-based learning without forgetting. Fire Ecol 19, 16 (2023).',
    link: 'https://fireecology.springeropen.com/articles/10.1186/s42408-022-00165-0',
  },
  methodology: {
    title: 'Technical Approach',
    steps: [
      {
        title: 'Data Augmentation',
        description:
          'Applied rigorous transformations including rotation, shearing, and brightness adjustments to ensure model robustness against lighting and orientation changes.',
      },
      {
        title: 'Transfer Learning',
        description:
          'Leveraged pre-trained convolutional neural networks (CNNs) to extract high-level features, significantly reducing training time while improving accuracy.',
      },
      {
        title: 'LwF Implementation',
        description:
          'Integrated Learning without Forgetting loss functions to preserve knowledge of "safe" forest states while aggressively learning new fire signatures.',
      },
    ],
  },
  modelNote: {
    title: 'Model Architecture Difference',
    content:
      'The model deployed in this live classifier is optimized for edge performance. Unlike the heavy research model described in the paper, this version uses a lightweight MobileNet architecture trained via Teachable Machine to ensure sub-second inference speeds directly in your browser.',
    icon: '⚡',
  },
};

export const toolConfig = {
  title: 'Forest Fire Classifier',
  description: 'Upload forest imagery to detect potential wildfire activity using advanced AI.',
  predictionMode: 'client',
  maxFileSize: '4MB',
  supportedFormats: ['JPG', 'PNG', 'WebP'],
  maxBulkFiles: 6,
  steps: [
    {
      title: 'Upload',
      description: 'Select imagery for analysis',
    },
    {
      title: 'Review & Submit',
      description: 'Review selection and start analysis',
    },
    {
      title: 'Results',
      description: 'View analysis results',
    },
  ],
  classes: [
    { name: 'Fire', color: 'red', description: 'Active flames detected' },
    { name: 'Smoke', color: 'gray', description: 'Smoke without visible flames' },
    { name: 'SmokeFire', color: 'orange', description: 'Both smoke and fire present' },
    { name: 'No Fire', color: 'green', description: 'No fire or smoke detected' },
  ],
  tips: [
    'Use clear, well-lit images for best results',
    'Forest or vegetation images work best',
    'Avoid heavily filtered or processed images',
  ],
  bulkLimitNotice: 'You can upload up to 6 images at a time. Larger batches may trigger rate limits.',
};
