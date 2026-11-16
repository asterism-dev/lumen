import { effectScope } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsMobile } from '../src/composables/useIsMobile';

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<(e: { matches: boolean }) => void>();
  const mql = {
    matches,
    addEventListener: vi.fn((_: string, l: (e: { matches: boolean }) => void) => listeners.add(l)),
    removeEventListener: vi.fn((_: string, l: (e: { matches: boolean }) => void) =>
      listeners.delete(l),
    ),
  };
  const mm = vi.fn(() => mql);
  vi.stubGlobal('matchMedia', mm);
  return { mql, mm, listeners };
}

describe('useIsMobile', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('is true when the 767.98px query matches and follows change events', () => {
    const { mm, listeners } = mockMatchMedia(true);
    const scope = effectScope();
    const isMobile = scope.run(() => useIsMobile())!;
    expect(mm).toHaveBeenCalledWith('(max-width: 767.98px)');
    expect(isMobile.value).toBe(true);
    listeners.forEach((l) => l({ matches: false }));
    expect(isMobile.value).toBe(false);
    scope.stop();
  });

  it('removes its listener when the scope is disposed', () => {
    const { mql, listeners } = mockMatchMedia(false);
    const scope = effectScope();
    scope.run(() => useIsMobile());
    expect(listeners.size).toBe(1);
    scope.stop();
    expect(mql.removeEventListener).toHaveBeenCalled();
    expect(listeners.size).toBe(0);
  });
});
