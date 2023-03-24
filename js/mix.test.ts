import { describe, expect, test } from '@jest/globals';
import { mix } from './mix';

describe('arrayContaining', () => {
  test('matches even if received contains additional elements', () => {
    const expected = [1, 3, 6, 7];
    const mixArray = mix(expected);
    expect(mixArray).toEqual(expect.arrayContaining(expected));
  });
});
