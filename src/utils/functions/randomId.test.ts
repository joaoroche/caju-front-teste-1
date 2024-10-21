import { randomId } from './randomId';

describe('randomId', () => {
  test('returns a string', () => {
    const id = randomId();
    expect(typeof id).toBe('string');
  });

  test('returns a unique string on multiple calls', () => {
    const id1 = randomId();
    const id2 = randomId();
    expect(id1).not.toBe(id2);
  });
});