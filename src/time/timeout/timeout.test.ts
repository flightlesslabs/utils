import { describe, it, expect } from 'vitest';
import timeout from './timeout';

describe('timeout', () => {
  it('resolves after approximately the specified time', async () => {
    const ms = 100;
    const start = Date.now();

    await timeout(ms);

    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(ms);
    expect(elapsed).toBeLessThan(ms + 50);
  });
});
