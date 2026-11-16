import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/theme/tokens.css', 'utf8');
const ASTERISM_VARS = [
  '--bg',
  '--panel',
  '--text',
  '--muted',
  '--border',
  '--accent',
  '--select',
  '--danger',
  '--hl-keyword',
  '--hl-string',
  '--hl-comment',
  '--hl-number',
  '--hl-title',
  '--hl-type',
  '--hl-attr',
  '--idle',
  '--waiting',
  '--exited',
  '--success',
  '--warning',
  '--merged',
  '--ws-blue',
  '--ws-green',
  '--ws-amber',
  '--ws-red',
  '--ws-purple',
  '--ws-pink',
  '--ws-teal',
  '--ws-slate',
  '--font-ui',
  '--radius',
  '--on-accent',
];

describe('tokens.css', () => {
  it('defines every Asterism theme variable in light mode', () => {
    for (const v of ASTERISM_VARS) expect(css).toMatch(new RegExp(`:root[^{]*\\{[^}]*${v}:`));
  });
  it('overrides colors in dark mode', () => {
    expect(css).toContain(":root[data-theme='dark']");
    expect(css).toMatch(/\[data-theme='dark'\][^{]*\{[^}]*--bg:\s*#16171d/);
  });
  it('wraps everything in the lumen layer', () => {
    expect(css.trim()).toMatch(/^@layer lumen\s*\{/);
  });
});

describe('touch sizing', () => {
  it('sets the touch variables on phones and under .lm-touch', () => {
    const blocks = [
      ...css.matchAll(/(@media \(max-width: 767\.98px\) \{\s*:root|\.lm-touch) \{([^}]*)\}/g),
    ];
    expect(blocks.map((b) => b[1].startsWith('.lm-touch'))).toEqual([false, true]);
    for (const [, , body] of blocks) {
      expect(body).toContain('--lm-touch-target: 44px');
      expect(body).toContain('--lm-input-font-size: 16px');
    }
  });
});
