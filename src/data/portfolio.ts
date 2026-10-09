export const personalInfo = {
  name: 'Suryakant Tripathi',
  firstName: 'Suryakant',
  lastName: 'Tripathi',
  nickname: 'Surya',
  role: 'Frontend Software Engineer (React.js, TypeScript)',
  tagline: 'Building high-performance React.js & TypeScript platforms, real-time gaming engines, and scalable micro-frontends at global scale.',
  email: 'suryakant.trip@gmail.com',
  location: 'Hyderabad, India',
  availability: 'Available for new opportunities',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Tsurya06', icon: 'Github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/suryakant-tripathi-/', icon: 'Linkedin' },
    { label: 'Email', url: 'mailto:suryakant.trip@gmail.com', icon: 'Mail' },
  ],
};

export const stats = [
  { label: 'Years Experience', value: 3.8, suffix: '+' },
  { label: 'Production Features', value: 20, suffix: '+' },
  { label: 'Industry Roles', value: 3, suffix: '' },
  { label: 'Standards & Vitals', value: 100, suffix: '%' },
];

export const aboutContent = {
  intro: 'Frontend Software Engineer with 3.8 years building large, well-tested React.js & TypeScript platforms for enterprise and real-time systems.',
  paragraphs: [
    'With 3.8 years of production frontend engineering experience, I specialize in building large, resilient, and well-tested React.js and TypeScript applications. My background spans micro-frontend architectures, real-time WebSocket state management, and complex enterprise systems designed for high availability and global scale.',
    'I focus deeply on frontend architecture, scalable state orchestration with Redux Toolkit, and granular role-based access control (RBAC). Guided by Core Web Vitals and Lighthouse audits, I optimize runtime performance through memoization, code-splitting, selective subscriptions, and render profiling.',
    'I collaborate closely with product designers and engineering teams in Agile workflows to convert mockups into accessible, production-grade features using semantic HTML, ARIA, and keyboard navigation. Backed by rigorous Jest and React Testing Library suites, CI/CD automation, and front-end debugging with Chrome DevTools, I build for scale, speed, and reliability.',
  ],
  philosophy: [
    { icon: 'Zap', title: 'Performance & Vitals', desc: 'Render optimization, selective subscriptions, and Core Web Vitals audits to maximize speed.' },
    { icon: 'Layers', title: 'Scalable Architecture', desc: 'Micro-frontend architecture, modular component systems, and real-time event-driven state.' },
    { icon: 'Blocks', title: 'Reusable Systems & RBAC', desc: 'Modular, maintainable components with granular permission security and clean separation.' },
    { icon: 'Gauge', title: 'Tested & Accessible', desc: 'Robust Jest/RTL coverage, front-end debugging with Chrome DevTools, and WCAG/ARIA UX.' },
  ],
};

export const skillsData = [
  {
    category: 'Frontend Core',
    icon: 'Code2',
    color: '#00d4aa',
    items: [
      { name: 'React.js', level: 96 },
      { name: 'TypeScript', level: 94 },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'HTML5 & ARIA (WCAG)', level: 92 },
      { name: 'Tailwind CSS / Ant Design', level: 90 },
    ],
  },
  {
    category: 'Architecture & State',
    icon: 'Layers',
    color: '#3b82f6',
    items: [
      { name: 'Micro-Frontend Architecture', level: 92 },
      { name: 'Redux Toolkit / Redux', level: 95 },
      { name: 'WebSockets & Real-Time', level: 90 },
      { name: 'Next.js & Routing', level: 88 },
      { name: 'REST APIs, Axios & RBAC', level: 94 },
    ],
  },
  {
    category: 'Performance & Quality',
    icon: 'Wrench',
    color: '#f59e0b',
    items: [
      { name: 'Core Web Vitals & Lighthouse', level: 92 },
      { name: 'Render Optimization & Memo', level: 94 },
      { name: 'Jest & React Testing Library', level: 88 },
      { name: 'Chrome DevTools Debugging', level: 92 },
      { name: 'Git, Vite & CI/CD Pipelines', level: 90 },
    ],
  },
];

export const projects = [
  {
    title: 'FrontendForge',
    description: 'A comprehensive frontend engineering excellence platform, interactive component laboratory, and system design handbook for modern web architecture, JavaScript internals, and React 19. Designed for developers to learn, build, and master frontend development through real challenges.',
    tech: ['React 19', 'TypeScript', 'Web Vitals', 'CSS Grid', 'Tailwind CSS', 'System Design'],
    featured: true,
    accent: '#00d4aa',
    image: `${import.meta.env.BASE_URL}frontend-forge.png`,
    metrics: [
      { label: 'Interactive Labs', value: '20+' },
      { label: 'Core Coverage', value: 'JS & React 19' },
      { label: 'Lighthouse', value: '100' },
    ],
    links: {
      demo: 'https://tsurya06.github.io/frontend-forge/',
      source: 'https://github.com/Tsurya06/frontend-forge',
    },
  },
];

export const experience = [
  {
    role: 'Software Development Engineer 1 — Frontend',
    company: 'ARRISE powering Pragmatic Play',
    period: 'Jun 2025 — Present',
    location: 'Hyderabad, India',
    description: 'Owned the architecture and frontend development of PromoEar micro-frontend platform powering Live Casino & Slots promotions across 6,000+ operators in 40+ countries.',
    achievements: [
      'Owned the architecture and frontend development of PromoEar, a micro-frontend platform powering promotions across 6,000+ operators in 40+ countries',
      'Engineered campaign prioritization and bonus lifecycle management features using React.js and TypeScript',
      'Built real-time games Live Machine, Guess The Number, and Plinko using Redux Toolkit state management and WebSockets for 500+ live tables',
      'Improved UI performance by 50% via memoization, selective Redux subscriptions, and render optimization guided by Core Web Vitals and Lighthouse audits',
      'Delivered Player Journey (~80% of gameplay UI), including progress tracking, animations, responsive panels, and real-time synchronization',
      'Collaborated with UX designers to convert mock-ups into accessible UIs using semantic HTML, ARIA, and keyboard navigation',
    ],
    stack: ['React.js', 'TypeScript', 'Micro-Frontends', 'Redux Toolkit', 'WebSockets', 'Core Web Vitals'],
  },
  {
    role: 'Software Development Engineer 1',
    company: 'UnORG Vendor Solutions Pvt. Ltd.',
    period: 'Jan 2024 — Apr 2025',
    location: 'Noida, India',
    description: 'Led frontend development of 7+ business-critical modules, scalable RBAC security, and automated CI/CD release pipelines.',
    achievements: [
      'Led frontend development of 7+ business-critical modules including Expenses, Payments, Purchase, Targets & Bonuses, Stakeholders, Vehicles, and Role Management',
      'Engineered a scalable RBAC system with 30+ granular permissions, enabling secure access across multiple business domains',
      'Built reusable React.js and TypeScript components, reducing frontend development effort by 40%',
      'Wrote Jest and React Testing Library unit tests, tracking code coverage to prevent regressions',
      'Optimized REST integration (Axios, JWT, centralized error handling) and used Chrome DevTools for front-end debugging, cutting debugging time by 50%',
      'Implemented CI/CD pipelines and delivered 20+ production features, reducing release time by 70%',
    ],
    stack: ['React.js', 'TypeScript', 'Jest', 'React Testing Library', 'Axios', 'CI/CD'],
  },
  {
    role: 'Assistant Software Engineer',
    company: 'Nucleus Software',
    period: 'Jan 2023 — Dec 2023',
    location: 'Noida, India',
    description: 'Built the Maker-Checker role-based approval web application and cross-browser temporary email extensions.',
    achievements: [
      'Built the Maker-Checker web application, a role-based approval workflow replacing manual sign-off processes with modular frontend architecture',
      'Developed a browser extension for temporary email with real-time inbox updates and automated cleanup, shipped across Chrome, Firefox, Safari, and Edge',
      'Ensured full cross-browser compatibility with a seamless installation flow, removing a recurring source of user-reported install failures',
    ],
    stack: ['JavaScript', 'TypeScript', 'React.js', 'Browser Extensions', 'REST APIs'],
  },
  {
    role: 'B.Tech in Computer Science and Engineering (71.60%)',
    company: 'I.T.S Engineering College',
    period: '2019 — 2023',
    location: 'Greater Noida, India',
    description: 'Earned Bachelor of Technology in Computer Science and Engineering with 71.60% aggregate score.',
    achievements: [
      'Completed core foundational coursework in Data Structures, Algorithms, Object-Oriented Design, and Web Development',
      'Built academic web applications and actively participated in technical coding symposiums and hackathons',
    ],
    stack: ['Data Structures', 'Algorithms', 'Web Development', 'Computer Science'],
  },
];



export const techBadges = [
  'React.js', 'TypeScript', 'Next.js', 'Micro-Frontends', 'Redux Toolkit',
  'WebSockets', 'Tailwind CSS', 'Vite', 'Jest', 'React Testing Library',
  'Core Web Vitals', 'Axios', 'REST APIs', 'Chrome DevTools', 'CI/CD', 'Git',
];
