export function mapColumns(
  data: any[],
  columnA: string,
  columnB: string,
): Record<string, any> {
  // 检查数据是否为空数组
  if (data.length === 0) {
    return {};
  }

  // 检查所有数据项是否包含指定的列
  for (const item of data) {
    if (!(columnA in item)) {
      throw new Error(`Column '${columnA}' does not exist in data`);
    }
    if (!(columnB in item)) {
      throw new Error(`Column '${columnB}' does not exist in data`);
    }
  }

  // 构建映射对象
  const result: Record<string, any> = {};

  for (const item of data) {
    const key = item[columnA];
    const value = item[columnB];
    result[key] = value;
  }

  return result;
}
