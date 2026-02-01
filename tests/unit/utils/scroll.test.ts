import { describe, it, expect } from 'vitest';
import { easingFunction } from '@/utils/scroll';

describe('Scroll Utils', () => {
  describe('easingFunction', () => {
    it('should return close to 0 for t=0', () => {
      const result = easingFunction(0);
      expect(result).toBeLessThan(0.01);
    });

    it('should return 1 for t=1', () => {
      expect(easingFunction(1)).toBeLessThanOrEqual(1);
    });

    it('should return values between 0 and 1', () => {
      const result = easingFunction(0.5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });

    it('should be monotonically increasing', () => {
      const t1 = easingFunction(0.3);
      const t2 = easingFunction(0.6);
      expect(t2).toBeGreaterThan(t1);
    });
  });
});
