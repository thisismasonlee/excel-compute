export function computeRows(data: any[], columnA: string, columnB: string, computeFn: (a: any, b: any) => any): any[] {
  // 检查数据是否为空数组
  if (data.length === 0) {
    return [];
  }

  // 映射数据，为每行创建新对象
  return data.map((item) => {
    // 检查行是否包含指定的列，且值不为 null 或 undefined
    if (
      item.hasOwnProperty(columnA) &&
      item.hasOwnProperty(columnB) &&
      item[columnA] != null &&
      item[columnB] != null
    ) {
      // 计算结果并创建新对象
      const result = computeFn(item[columnA], item[columnB]);
      return {
        ...item,
        result
      };
    }
    // 对于不符合条件的行，返回原始对象的深拷贝
    return { ...item };
  });
}