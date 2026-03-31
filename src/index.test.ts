import { describe, it, expect } from 'vitest';
import { sum, average } from './index';

describe('sum function', () => {
  it('should return 0 for empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('should return the sum of numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });

  it('should handle negative numbers', () => {
    expect(sum([-1, -2, 3])).toBe(0);
  });
});

describe('average function', () => {
  it('should return 0 for empty array', () => {
    expect(average([])).toBe(0);
  });

  it('should return the average of numbers', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
  });

  it('should handle decimal average', () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([1, 2])).toBe(1.5);
  });
});