import { describe, expect, test } from '@jest/globals';
import { getRandom } from './getRandom';

describe('random index should be in [0, max)', () => {
  const max = 6;
  const random = getRandom(max);

  test('should be greater than or equal to 0', () => {
    expect(random).toBeGreaterThanOrEqual(0);
  });

  test('should be less than max', () => {
    expect(random).toBeLessThan(max);
  });
});
