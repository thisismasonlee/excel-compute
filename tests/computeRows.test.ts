import { describe, it, expect } from 'vitest';
import { computeRows } from '../src/index';

describe('computeRows function', () => {
  it('should compute rows with multiplication', () => {
    const data = [
      { id: 1, value1: 2, value2: 3 },
      { id: 2, value1: 4, value2: 5 },
      { id: 3, value1: 6, value2: 7 }
    ];
    
    const multiply = (a: number, b: number) => a * b;
    const result = computeRows(data, 'value1', 'value2', multiply);
    
    expect(result).toEqual([
      { id: 1, value1: 2, value2: 3, result: 6 },
      { id: 2, value1: 4, value2: 5, result: 20 },
      { id: 3, value1: 6, value2: 7, result: 42 }
    ]);
  });

  it('should compute rows with addition', () => {
    const data = [
      { id: 1, value1: 2, value2: 3 },
      { id: 2, value1: 4, value2: 5 }
    ];
    
    const add = (a: number, b: number) => a + b;
    const result = computeRows(data, 'value1', 'value2', add);
    
    expect(result).toEqual([
      { id: 1, value1: 2, value2: 3, result: 5 },
      { id: 2, value1: 4, value2: 5, result: 9 }
    ]);
  });

  it('should skip rows with null values', () => {
    const data = [
      { id: 1, value1: 2, value2: 3 },
      { id: 2, value1: null, value2: 5 },
      { id: 3, value1: 6, value2: null }
    ];
    
    const multiply = (a: number, b: number) => a * b;
    const result = computeRows(data, 'value1', 'value2', multiply);
    
    expect(result).toEqual([
      { id: 1, value1: 2, value2: 3, result: 6 },
      { id: 2, value1: null, value2: 5 },
      { id: 3, value1: 6, value2: null }
    ]);
  });

  it('should handle non-numeric values', () => {
    const data = [
      { id: 1, value1: 2, value2: 3 },
      { id: 2, value1: '4', value2: 5 },
      { id: 3, value1: 6, value2: '7' }
    ];
    
    const add = (a: any, b: any) => Number(a) + Number(b);
    const result = computeRows(data, 'value1', 'value2', add);
    
    expect(result).toEqual([
      { id: 1, value1: 2, value2: 3, result: 5 },
      { id: 2, value1: '4', value2: 5, result: 9 },
      { id: 3, value1: 6, value2: '7', result: 13 }
    ]);
  });

  it('should return a new array (immutability)', () => {
    const data = [
      { id: 1, value1: 2, value2: 3 }
    ];
    
    const multiply = (a: number, b: number) => a * b;
    const result = computeRows(data, 'value1', 'value2', multiply);
    
    expect(result).not.toBe(data);
    expect(result[0]).not.toBe(data[0]);
  });

  it('should correctly write result to new field', () => {
    const data = [
      { id: 1, value1: 2, value2: 3 }
    ];
    
    const multiply = (a: number, b: number) => a * b;
    const result = computeRows(data, 'value1', 'value2', multiply);
    
    expect(result[0]).toHaveProperty('result');
    expect(result[0].result).toBe(6);
  });

  it('should handle empty data array', () => {
    const data: any[] = [];
    
    const multiply = (a: number, b: number) => a * b;
    const result = computeRows(data, 'value1', 'value2', multiply);
    
    expect(result).toEqual([]);
  });

  it('should handle rows with missing columns', () => {
    const data = [
      { id: 1, value1: 2, value2: 3 },
      { id: 2, value1: 4 },
      { id: 3, value2: 5 }
    ];
    
    const multiply = (a: number, b: number) => a * b;
    const result = computeRows(data, 'value1', 'value2', multiply);
    
    expect(result).toEqual([
      { id: 1, value1: 2, value2: 3, result: 6 },
      { id: 2, value1: 4 },
      { id: 3, value2: 5 }
    ]);
  });
});