import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook to manage Lenis smooth scrolling
 */
export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF loop
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };

    const animationId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      lenisRef.current?.destroy();
    };
  }, []);

  const scrollToElement = (element: HTMLElement, options?: any) => {
    lenisRef.current?.scrollTo(element, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });
  };

  return { lenisRef, scrollToElement };
};
