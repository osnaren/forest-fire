/**
 * Page configuration for Forest Fire Classifier v2
 * Centralized configuration for copy, links, and settings
 */

import Logo from '@visual/logo';
import { FaUserLock } from 'react-icons/fa';
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
    twitter: 'https://x.com/osnaren',
    linkedin: 'https://linkedin.com/in/osnaren',
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
      classes: ['fire', 'no-fire', 'smoke', 'smoke-fire'],
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
      href: siteConfig.social.github,
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
    title: 'About This Project',
    description:
      'A personal journey into AI-powered wildfire detection. Built with passion for environmental protection and cutting-edge technology.',
  },
  story: {
    title: 'The Story Behind the Project',
    content: [
      'What started as a curiosity about machine learning and environmental challenges has evolved into a comprehensive wildfire detection system. This project represents months of research, experimentation, and refinement.',
      'The devastating impact of wildfires on communities and ecosystems worldwide motivated me to explore how AI could help in early detection and prevention. Every line of code was written with the hope of making a difference.',
      "This isn't just another tech demo – it's a testament to how individual developers can tackle real-world problems using accessible tools and determination.",
    ],
  },
  techStack: {
    title: 'Technology Stack',
    items: [
      {
        name: 'TensorFlow',
        description: 'Deep learning framework for training the CNN model',
        category: 'Machine Learning',
      },
      {
        name: 'Next.js',
        description: 'React framework for the web application',
        category: 'Frontend',
      },
      {
        name: 'TypeScript',
        description: 'Type-safe JavaScript for better development experience',
        category: 'Language',
      },
      {
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework for styling',
        category: 'Styling',
      },
      {
        name: 'Framer Motion',
        description: 'Animation library for smooth interactions',
        category: 'Animation',
      },
      {
        name: 'Vercel',
        description: 'Deployment platform for fast global distribution',
        category: 'Infrastructure',
      },
    ],
  },
  metrics: {
    title: 'Project Metrics',
    items: [
      {
        label: 'Training Time',
        value: '72',
        unit: 'hours',
        description: 'Time spent training the model',
      },
      {
        label: 'Code Quality',
        value: 'A+',
        unit: '',
        description: 'ESLint and TypeScript score',
      },
      {
        label: 'Test Coverage',
        value: '94',
        unit: '%',
        description: 'Unit and integration tests',
      },
      {
        label: 'Performance',
        value: '98',
        unit: '/100',
        description: 'Lighthouse performance score',
      },
    ],
  },
  journey: {
    title: 'Development Journey',
    items: [
      {
        phase: 'Research & Planning',
        duration: 'Week 1-2',
        description: 'Researching wildfire detection methods, dataset collection, and model architecture design.',
        achievements: ['Dataset curation', 'Model architecture selection', 'Project planning'],
      },
      {
        phase: 'Model Development',
        duration: 'Week 3-6',
        description: 'Building and training the CNN model, hyperparameter tuning, and performance optimization.',
        achievements: ['Model training', '97.8% accuracy achieved', 'Performance optimization'],
      },
      {
        phase: 'Web Application',
        duration: 'Week 7-10',
        description: 'Developing the Next.js application, API integration, and user interface design.',
        achievements: ['Modern UI/UX', 'API development', 'Real-time prediction'],
      },
      {
        phase: 'Testing & Deployment',
        duration: 'Week 11-12',
        description: 'Comprehensive testing, performance optimization, and production deployment.',
        achievements: ['Testing suite', 'Performance optimization', 'Production deployment'],
      },
    ],
  },
  connect: {
    title: "Let's Connect",
    description: "Interested in the project? Have questions about the implementation? I'd love to hear from you.",
    links: [
      {
        text: 'View Source Code',
        href: siteConfig.social.github,
        icon: 'github',
      },
      {
        text: 'Connect on LinkedIn',
        href: siteConfig.social.linkedin,
        icon: 'linkedin',
      },
      {
        text: 'Follow on Twitter',
        href: siteConfig.social.twitter,
        icon: 'twitter',
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
    tagline: 'Made with 🧡🤍💚 in 🇮🇳',
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
      { text: 'Research Paper', href: '#', description: 'Academic publication', comingSoon: true },
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
      'Deep dive into the technical details, model architecture, and scientific approach behind our wildfire detection system.',
  },
  methodology: {
    title: 'Our Approach',
    sections: [
      {
        title: 'Data Collection',
        description: 'Curated dataset from NASA FIRMS, Kaggle, and proprietary sources',
        details: 'Over 15,000 labeled images across 4 classes',
      },
      {
        title: 'Model Architecture',
        description: 'Optimized CNN based on MobileNetV2 for browser deployment',
        details: 'Custom layers for improved accuracy and speed',
      },
      {
        title: 'Training Process',
        description: 'Transfer learning with data augmentation and careful validation',
        details: '94.2% accuracy on validation set',
      },
    ],
  },
  metrics: {
    title: 'Performance Metrics',
    items: [
      { label: 'Overall Accuracy', value: '94.2%', description: 'Validation set performance' },
      { label: 'Fire Detection', value: '96.1%', description: 'Precision for fire class' },
      { label: 'Smoke Detection', value: '91.8%', description: 'Precision for smoke class' },
      { label: 'Model Size', value: '4.2MB', description: 'Optimized for web deployment' },
    ],
  },
};

export const toolConfig = {
  title: 'Forest Fire Classifier',
  description: 'Upload an image to detect wildfire activity using our AI model',
  maxFileSize: '4MB',
  supportedFormats: ['JPG', 'PNG', 'WebP'],
  maxBulkFiles: 6,
  steps: [
    {
      title: 'Upload',
      description: 'Choose single or multiple images to analyze',
    },
    {
      title: 'Review & Submit',
      description: 'Verify selections and start the predictions',
    },
    {
      title: 'Results',
      description: 'Inspect confidence scores and insights',
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
