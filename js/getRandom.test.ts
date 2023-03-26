import { describe, expect, test } from '@jest/globals';
import { getRandom } from './getRandom';

test('should be in [0, max]', () => {
  const max = 6;
  const indexesBeforeMax = [0, 1, 2, 3, 4, 5];
  const random = getRandom(max);
  expect(indexesBeforeMax).toContain(random);
});
