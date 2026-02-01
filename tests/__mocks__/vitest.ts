import { vi } from 'vitest';

// Re-export vi for convenience
export { vi };

// Mock for three.js
export const mockThreeVector2 = (x = 0, y = 0) => ({
  x,
  y,
  set: vi.fn(),
  lerp: vi.fn(),
});

export const mockThreeVector3 = (x = 0, y = 0, z = 0) => ({
  x,
  y,
  z,
  lerp: vi.fn(),
});

export const mockThreeColor = () => ({
  setHSL: vi.fn().mockReturnThis(),
  lerp: vi.fn(),
});

// Mock for Lenis
export const mockLenis = {
  raf: vi.fn(),
  scrollTo: vi.fn(),
  destroy: vi.fn(),
};
