
import { Project } from '@/types';

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/ayesha-qureshi-a67414344/',
  github: 'https://github.com/Ayxshaa',
};

export const PROJECT_CATEGORIES = ['Frontend', '3D', 'AI Design'] as const;

export const PROJECTS: Project[] = [
  {
    id: 'tomorrowland',
    title: 'Portfolio',
    year: '2025',
    category: '3D',
    description: [
      'Building a 3D portfolio',
      'inspired by moon and jazz,',
      'with immersive particles'
    ],
    theme: '#6b21a8', // Purple
    color: '#a855f7',
    deployedLink: 'https://ayeshaportfoliooo.netlify.app/',
    githubLink: 'https://github.com/Ayxshaa/portfolio-ash'
  },
  {
    id: 'A4 Zone',
    title: 'A4 Zone',
    year: '2025',
    category: 'Frontend',
    description: [
      'Chat with three smart modes,',
      'get personalized suggestions,',
      'in real time'
    ],
    theme: '#1e3a8a', // Blue
    color: '#3b82f6',
    deployedLink: 'https://a4zone.netlify.app/',
    githubLink: 'https://github.com/Ayxshaa/chat-app'
  },
  {
    id: 'FlowEvent',
    title: 'FlowEvent',
    year: '2025',
    category: 'Frontend',
    description: [
      'Building a dynamic platform',
      'for managing and exploring,',
      'live flow events'
    ],
    theme: '#064e3b', // Green
    color: '#10b981',
    deployedLink: 'https://flowevent.netlify.app/',
    githubLink: 'https://github.com/Ayxshaa/EDC-LandingPage'
  },
  {
    id: 'urGallery',
    title: 'URGALLERY',
    year: '2025',
    category: '3D',
    description: [
      'A 3D gallery space',
      'showcasing interactive art,',
      'built with Three.js'
    ],
    theme: '#991b1b', // Red
    color: '#ef4444',
    deployedLink: 'https://ayxshaa.github.io/VideoGallery/',
    githubLink: 'https://github.com/Ayxshaa/VideoGallery'
  },
  {
    id: 'ai-design-demo',
    title: 'AI Design Demo',
    year: '2025',
    category: 'AI Design',
    description: [
      'Placeholder for AI-assisted',
      'design work — details',
      'coming soon'
    ],
    theme: '#78350f', // Amber
    color: '#f59e0b',
  }
];
