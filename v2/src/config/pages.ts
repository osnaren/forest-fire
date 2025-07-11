/**
 * Page configuration for Forest Fire Classifier v2
 * Centralized configuration for copy, links, and settings
 */

export const siteConfig = {
  name: 'Forest Fire Classifier',
  version: 'v2',
  description: 'Professional-grade wildfire detection powered by advanced machine learning',
  url: 'https://forestfire.example.com',
  author: {
    name: 'Obuli Sai Naren',
    email: '66naren@gmail.com',
    twitter: '@osnaren',
    github: 'https://github.com/osnaren',
  },
  social: {
    github: 'https://github.com/osnaren/ForestFire',
    twitter: 'https://twitter.com/osnaren',
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
        icon: '⚡',
        title: 'Real-time Detection',
        description: 'Sub-second analysis directly in your browser — vital seconds saved in early response.',
      },
      {
        icon: '📦',
        title: 'Lightweight Web Model',
        description: 'Teachable-Machine MobileNet distilled to <5 MB, so it loads even on 3G.',
      },
      {
        icon: '🔒',
        title: 'Privacy-First',
        description: 'Images stay on-device by default; no cloud upload needed.',
      },
      {
        icon: '🔀',
        title: 'Flexible Deployment',
        description: 'Run client-side or call the optional rate-limited API for server inference.',
      },
      {
        icon: '📊',
        title: 'Confidence Scores',
        description: 'See class probabilities to gauge how certain the model is.',
      },
      {
        icon: '🛠️',
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
    },
    secondary: {
      text: 'View on GitHub',
      href: siteConfig.social.github,
    },
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
  main: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Research',
      href: '/research',
    },
    {
      title: 'API Docs',
      href: '/api-docs',
    },
  ],
  mobile: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Research',
      href: '/research',
    },
    {
      title: 'API Docs',
      href: '/api-docs',
    },
  ],
};

export const footerConfig = {
  links: {
    project: [
      { text: 'About', href: '/about' },
      { text: 'Research', href: '/research' },
      { text: 'API Docs', href: '/api-docs' },
    ],
    connect: [
      { text: 'GitHub', href: siteConfig.social.github },
      { text: 'Twitter', href: siteConfig.social.twitter },
      { text: 'LinkedIn', href: siteConfig.social.linkedin },
    ],
  },
  model: {
    status: 'Active',
    version: 'v2.1',
    lastUpdated: '2024-01-15',
  },
  copyright: {
    text: 'Built with ❤️ by',
    name: siteConfig.author.name,
    year: new Date().getFullYear(),
  },
};
