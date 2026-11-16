import { describe, expect, it } from 'vitest';
import { max, maxLength, min, minLength, pattern, required } from '../src/validation';

describe('rules', () => {
  it('required rejects empty values', () => {
    for (const empty of ['', null, undefined, false, []])
      expect(required()(empty)).toBe('Required');
    expect(required('Pick one')('')).toBe('Pick one');
    expect(required()(0)).toBe(true);
    expect(required()('x')).toBe(true);
  });

  it('other rules pass empty values so they combine with required', () => {
    for (const rule of [min(1), max(1), minLength(1), maxLength(1), pattern(/x/)])
      expect(rule('')).toBe(true);
  });

  it('checks bounds, lengths and patterns', () => {
    expect(min(1)(0)).toBe('Must be at least 1');
    expect(max(10)(11)).toBe('Must be at most 10');
    expect(max(10)(10)).toBe(true);
    expect(minLength(3)('ab')).toBe('Must be at least 3 characters');
    expect(maxLength(2)('abc')).toBe('Must be at most 2 characters');
    expect(pattern(/^[a-z-]+$/, 'Lowercase only')('Abc')).toBe('Lowercase only');
    expect(pattern(/^[a-z-]+$/)('a-b')).toBe(true);
  });
});
