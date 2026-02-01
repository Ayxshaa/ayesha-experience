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

See  for detailed folder organization and conventions.

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


## Documentation

- [GSAP Documentation](https://gsap.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

## License

This project is licensed under the MIT License.

---

Built with ❤️ by Ayesha
