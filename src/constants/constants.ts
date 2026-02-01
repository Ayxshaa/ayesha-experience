
import { Project } from '@/types';

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/ayesha-qureshi-a67414344/',
  github: 'https://github.com/Ayxshaa',
};

export const PROJECTS: Project[] = [
  {
    id: 'tomorrowland',
    title: 'Portfolio',
    year: '2025',
    category: 'Web Experience',
    description: [
      'Building a 3D portfolio',
      'inspired by moon and jazz,',
      'with immersive particles'
    ],
    theme: '#6b21a8', // Purple
    color: '#a855f7',
    deployedLink: 'https://ayeshashhh.netlify.app/',
    githubLink: 'https://github.com/Ayxshaa/portfolio-ash'
  },
  {
    id: 'A4 Zone',
    title: 'A4 Zone',
    year: '2025',
    category: 'Strategy',
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
    category: 'Design Systems',
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
    category: 'Digital Art',
    description: [
      'A 3D gallery space',
      'showcasing interactive art,',
      'built with Three.js'
    ],
    theme: '#991b1b', // Red
    color: '#ef4444',
    deployedLink: 'https://ayxshaa.github.io/VideoGallery/',
    githubLink: 'https://github.com/Ayxshaa/VideoGallery'
  }
];
