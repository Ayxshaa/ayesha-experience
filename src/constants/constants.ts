
import { Project } from '@/types';
import a4zoneImage from '@/assets/images/a4zone.webp';
import floweventImage from '@/assets/images/flowevent.webp';
import portfolioImage from '@/assets/images/portfolio.webp';
import urgalleryImage from '@/assets/images/urgallery.webp';
import agggtmImage from '@/assets/images/agggtm.webp';
import ashhjazzImage from '@/assets/images/ashhjazz.webp';

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/ayesha-qureshi-a67414344/',
  github: 'https://github.com/Ayxshaa',
};

export const PROJECT_CATEGORIES = ['Frontend', '3D', 'My Design and Ideas'] as const;

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
    image: portfolioImage,
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
    image: a4zoneImage,
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
    image: floweventImage,
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
    image: urgalleryImage,
    deployedLink: 'https://ayxshaa.github.io/VideoGallery/',
    githubLink: 'https://github.com/Ayxshaa/VideoGallery'
  },
  {
    id: 'agggtm',
    title: 'AGGGTM',
    year: '2025',
    category: 'My Design and Ideas',
    description: [
      'A books website built with',
      'frame-by-frame scroll-driven',
      'animation'
    ],
    theme: '#78350f', // Amber
    color: '#f59e0b',
    image: agggtmImage,
    deployedLink: 'https://agggtm.netlify.app'
  },
  {
    id: 'ashhjazz',
    title: 'AshhJazz',
    year: '2025',
    category: 'My Design and Ideas',
    description: [
      'A cinematic jazz editorial',
      'portfolio with a noir aesthetic,',
      'built as a single-page Vue 3 app'
    ],
    theme: '#450a0a', // Noir red
    color: '#f43f5e',
    image: ashhjazzImage,
    deployedLink: 'https://ashhjazz.netlify.app/'
  }
];
