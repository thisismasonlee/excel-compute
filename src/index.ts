export function sum(values: number[]): number {
  return values.reduce((acc, curr) => acc + curr, 0);
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

export { readExcel } from './readExcel';
export { mapColumns } from './mapColumns';
export { computeRows } from './computeRows';
export { createFormulaCompute } from './formula';

export async function computeExcel(options: {
  file: Buffer | string;
  formula?: string;
  computeFn?: (a: any, b: any) => any;
  columnA: string;
  columnB: string;
  resultColumn: string;
}): Promise<any[]> {
  throw new Error('Not implemented');
}