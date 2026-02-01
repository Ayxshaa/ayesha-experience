import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('app structure should export context properly', async () => {
    const { NavigationContext } = await import('@/context/NavigationContext');
    expect(NavigationContext).toBeDefined();
  });

  it('custom hooks should be importable', async () => {
    const { useLenis } = await import('@/hooks');
    expect(useLenis).toBeDefined();
  });

  it('utilities should be accessible', async () => {
    const { easingFunction, getScrollProgress } = await import('@/utils');
    expect(easingFunction).toBeDefined();
    expect(getScrollProgress).toBeDefined();
  });

  it('constants should be properly structured', async () => {
    const { PROJECTS } = await import('@/constants/constants');
    expect(Array.isArray(PROJECTS)).toBe(true);
    expect(PROJECTS.length).toBeGreaterThan(0);
    expect(PROJECTS[0]).toHaveProperty('id');
    expect(PROJECTS[0]).toHaveProperty('title');
  });

  it('components should be importable', async () => {
    const {
      Hero,
      About,
      Experience,
      Cases,
      Navigation,
      SoundToggle,
      Loader,
      Footer,
      Scene,
    } = await import('@/components');
    
    expect(Hero).toBeDefined();
    expect(About).toBeDefined();
    expect(Experience).toBeDefined();
    expect(Cases).toBeDefined();
    expect(Navigation).toBeDefined();
    expect(SoundToggle).toBeDefined();
    expect(Loader).toBeDefined();
    expect(Footer).toBeDefined();
    expect(Scene).toBeDefined();
  });
});
