/**
 * Easing function for smooth scrolling animations
 * Matches GSAP's power4.out easing curve
 */
export const easingFunction = (t: number): number => {
  // Easing curve: cubic-bezier approximation of power4.out
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
};

/**
 * Calculate scroll progress as a percentage
 */
export const getScrollProgress = (): number => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  return totalHeight > 0 ? window.scrollY / totalHeight : 0;
};

/**
 * Smooth scroll to element
 */
export const smoothScrollToElement = (element: HTMLElement, duration: number = 1.2): void => {
  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY;
  const distance = target - start;
  const startTime = performance.now();

  const scroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    const ease = easingFunction(progress);

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};
