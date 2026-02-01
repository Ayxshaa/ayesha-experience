# Ayesha Experience - Cinematic Studio Portfolio

A high-end, WebGL-powered creative studio website featuring cinematic scroll animations, immersive 3D scenes, and editorial typography. Built with React, Vite, Three.js, and GSAP.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **Animation**: GSAP + Lenis (smooth scrolling)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## Project Structure

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for detailed folder organization and conventions.

```
src/
├── components/        # React components
├── context/          # React Context
├── hooks/            # Custom hooks
├── utils/            # Utility functions
├── types/            # TypeScript types
├── constants/        # Application constants
├── styles/           # Global styles
├── 3d/               # 3D-related files
├── App.tsx           # Root component
└── index.tsx         # Entry point

tests/
├── unit/             # Unit tests
├── integration/      # Integration tests
└── __mocks__/        # Mock utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ayesha-experience
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (if needed)
```bash
cp .env.example .env.local
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Scripts

### Development & Building
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI dashboard
- `npm run test:coverage` - Generate coverage report

### Code Quality
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Components

### Pages/Sections
- **Hero** - Landing section with animated intro text
- **About** - Philosophy and background
- **Experience** - Capabilities and work experience
- **Cases** - Project showcase with interactive cards
- **Navigation** - Top navigation bar with smooth scrolling
- **SoundToggle** - Sound control button
- **Loader** - Loading animation screen
- **Footer** - Footer section

### 3D Scene
- **Scene** - Three.js WebGL scene with camera controls, lighting, and particles

## Key Features

### Animations
- GSAP-powered text animations
- Scroll-triggered animations with ScrollTrigger
- Smooth scroll navigation with Lenis
- Camera parallax effects in 3D scene

### 3D Graphics
- Interactive WebGL background
- Procedural particle system
- Dynamic lighting with color cycling
- Model-based 3D objects

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive typography and layouts
- Touch-friendly interactions

### Performance
- Code splitting via Vite
- Production-optimized builds
- Lazy loading of components

## Testing

The project includes comprehensive tests:

### Unit Tests
- Component rendering
- Hook functionality
- Utility functions

### Integration Tests
- Component imports and exports
- Context and provider functionality
- Multi-component workflows

Run tests:
```bash
npm test                # Watch mode
npm run test:coverage   # With coverage report
```

## Production Checklist

- [x] Proper folder structure
- [x] TypeScript strict mode
- [x] ESLint configuration
- [x] Prettier formatting
- [x] Unit and integration tests
- [x] Custom hooks extracted
- [x] React Context for state management
- [x] Utility functions organized
- [x] Global styles separated
- [x] Path aliases configured
- [x] Barrel exports for clean imports
- [x] .gitignore configured
- [x] Build optimization
- [x] Production-ready Tailwind CSS (not CDN)

## Performance Optimization

### Current Optimizations
- Vite for fast builds and HMR
- Code splitting via dynamic imports
- Tree-shaking for unused code
- CSS purging with Tailwind
- Minified production builds

### Recommended Further Optimizations
- Image optimization with next-gen formats
- Lazy loading for off-screen content
- Service worker for PWA capabilities
- CDN deployment for static assets
- WebGL performance profiling

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Android Chrome 90+)

## Environment Variables

Currently, the app can use the following environment variables:
- `GEMINI_API_KEY` - For any AI-related features (optional)

## Contributing

1. Follow the folder structure guidelines
2. Use TypeScript for type safety
3. Write tests for new features
4. Run linting before committing
```bash
npm run lint:fix
npm run format
npm test
```

## Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder
```

### Other Platforms
1. Run `npm run build`
2. Deploy the `dist/` folder

## Documentation

- [Folder Structure](./FOLDER_STRUCTURE.md) - Detailed folder organization
- [GSAP Documentation](https://gsap.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

Built with ❤️ by Ayesha
