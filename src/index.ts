export function sum(values: number[]): number {
  return values.reduce((acc, curr) => acc + curr, 0);
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

export { readExcel } from './readExcel';
export { mapColumns } from './mapColumns';

export function computeRows(data: any[], columnA: string, columnB: string, computeFn: (a: any, b: any) => any): any[] {
  throw new Error('Not implemented');
}