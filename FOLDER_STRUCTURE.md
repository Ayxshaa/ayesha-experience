# Project Folder Structure

This document describes the production-level folder structure for the Ayesha Experience portfolio.

## Directory Overview

```
ayesha-experience/
├── src/                          # Source code
│   ├── components/               # Reusable React components
│   │   ├── index.ts             # Component barrel export
│   │   ├── About.tsx            # About section component
│   │   ├── Cases.tsx            # Case studies component
│   │   ├── Experience.tsx        # Experience/capabilities component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Hero.tsx             # Hero section component
│   │   ├── Loader.tsx           # Loading animation component
│   │   ├── Navigation.tsx        # Navigation bar component
│   │   ├── SoundToggle.tsx       # Sound toggle component
│   │   └── Scene/               # 3D scene components
│   │       └── index.tsx         # Three.js Scene component
│   ├── context/                  # React Context files
│   │   └── NavigationContext.tsx # Navigation scroll context
│   ├── hooks/                    # Custom React hooks
│   │   ├── index.ts             # Hooks barrel export
│   │   └── useLenis.ts          # Lenis smooth scroll hook
│   ├── utils/                    # Utility functions
│   │   ├── index.ts             # Utilities barrel export
│   │   └── scroll.ts            # Scroll-related utilities
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts             # Project types
│   ├── constants/                # Application constants
│   │   └── constants.ts         # Project data constants
│   ├── styles/                   # Global styles
│   │   └── globals.css          # Global CSS and reset styles
│   ├── 3d/                       # 3D models and related files
│   ├── App.tsx                   # Root App component
│   └── index.tsx                 # Entry point
├── tests/                        # Test files
│   ├── __mocks__/               # Mock data and utilities
│   ├── setup.ts                 # Vitest setup file
│   ├── unit/                    # Unit tests
│   │   ├── components/          # Component tests
│   │   │   ├── Navigation.test.tsx
│   │   │   └── SoundToggle.test.tsx
│   │   └── utils/               # Utility function tests
│   │       └── scroll.test.ts
│   └── integration/             # Integration tests
├── public/                       # Static assets
│   ├── images/                  # Image assets
│   │   ├── A4Zone.png
│   │   ├── Event.png
│   │   ├── Portfolio.png
│   │   ├── Urgallery.png
│   │   └── image.png
│   └── models/                  # 3D model files
│       ├── space_boi.glb
│       └── space_station_3.glb
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── vitest.config.ts             # Vitest configuration
├── tsconfig.json                # TypeScript configuration
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies and scripts
├── README.md                    # Main project documentation
├── FOLDER_STRUCTURE.md          # This file
└── metadata.json                # Application metadata
```

## Folder Descriptions

### `/src` - Source Code
Contains all application source code, organized by functionality.

### `/src/components`
Reusable React components. Each component is self-contained with its own styling and logic.
- **Hero**: Main landing section with animated text
- **About**: Philosophy and background section
- **Experience**: Capabilities and work experience
- **Cases**: Project showcase
- **Navigation**: Top navigation bar
- **SoundToggle**: Sound control button
- **Loader**: Loading animation screen
- **Footer**: Footer section
- **Scene**: Three.js WebGL scene

### `/src/context`
React Context API implementations for global state management.
- **NavigationContext**: Handles smooth scroll navigation

### `/src/hooks`
Custom React hooks for reusable logic.
- **useLenis**: Manages Lenis smooth scrolling

### `/src/utils`
Utility functions and helpers.
- **scroll.ts**: Scroll-related helper functions (easing, progress calculation)

### `/src/types`
TypeScript type definitions and interfaces.
- **index.ts**: Project types and enums

### `/src/constants`
Application constants and data.
- **constants.ts**: Project data array (cases, capabilities)

### `/src/styles`
Global CSS and styling.
- **globals.css**: Global resets, fonts, and utility styles

### `/tests`
All test files organized by type.
- **unit/**: Individual component and function tests
- **integration/**: Cross-component and feature tests
- **__mocks__/**: Mock data and utilities
- **setup.ts**: Vitest configuration and global test setup

### `/public`
Static assets served directly (no bundling).
- **images/**: Project images and screenshots
- **models/**: 3D GLB model files

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `Navigation.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLenis.ts`)
- **Utils**: camelCase (e.g., `scroll.ts`)
- **Types**: index.ts in folder, types themselves PascalCase (e.g., `NavigationContextType`)

### Exports
- **Barrel exports**: Each folder has an `index.ts` for clean imports
- Import: `import { useLenis } from '@/hooks'`
- Instead of: `import { useLenis } from '@/hooks/useLenis'`

## Development Workflow

### Running the App
```bash
npm run dev
```

### Running Tests
```bash
npm test                # Run tests in watch mode
npm run test:ui        # Run tests with UI
npm run test:coverage  # Generate coverage report
```

### Linting and Formatting
```bash
npm run lint           # Check for linting issues
npm run lint:fix       # Auto-fix linting issues
npm run format         # Format code with Prettier
npm run type-check     # Check TypeScript types
```

### Building
```bash
npm run build          # Build for production
npm run preview        # Preview production build
```

## Best Practices

1. **Component Organization**: Keep components focused on a single responsibility
2. **Path Aliases**: Always use `@/` aliases for imports instead of relative paths
3. **Styles**: Use Tailwind classes and global CSS for common styles
4. **Testing**: Write tests for components and utilities
5. **Type Safety**: Use TypeScript types for better IDE support and error catching
6. **Constants**: Keep magic numbers and strings in constants file
7. **Hooks**: Extract reusable logic into custom hooks
8. **Barrel Exports**: Use index.ts files for cleaner imports

## Adding New Features

### Adding a New Component
1. Create `src/components/NewComponent.tsx`
2. Add export to `src/components/index.ts`
3. Create test file: `tests/unit/components/NewComponent.test.tsx`
4. Import using: `import { NewComponent } from '@/components'`

### Adding a New Hook
1. Create `src/hooks/useNewHook.ts`
2. Add export to `src/hooks/index.ts`
3. Create test file: `tests/unit/hooks/useNewHook.test.ts`

### Adding a New Utility
1. Create `src/utils/newUtility.ts`
2. Add export to `src/utils/index.ts`
3. Create test file: `tests/unit/utils/newUtility.test.ts`

## Production Checklist

- [x] Proper folder structure
- [x] TypeScript configuration
- [x] ESLint and Prettier setup
- [x] Vitest configuration
- [x] Unit tests for key components
- [x] Custom hooks extracted
- [x] Context API for state management
- [x] Utility functions organized
- [x] Global styles separated
- [x] Path aliases configured
- [x] Barrel exports for clean imports
- [x] .gitignore configured
- [x] Documentation created
