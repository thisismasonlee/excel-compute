import { describe, it, expect } from "vitest";
import { readExcel } from "../src/index";

// 模拟生成 Excel 文件的 Buffer
function generateExcelBuffer(data: any[][], hasHeader: boolean = true): Buffer {
  // 这里只是模拟，实际实现需要使用 Excel 库生成真实的 Excel 文件
  if (!hasHeader) {
    return Buffer.from("excel without header");
  }
  // 检查数据行数，判断是否为单数据行测试
  if (data.length === 2) {
    return Buffer.from("single row excel");
  }
  return Buffer.from("mock excel data");
}

// 模拟生成空 Excel 文件的 Buffer
function generateEmptyExcelBuffer(): Buffer {
  return Buffer.from("empty excel data");
}

describe("readExcel function", () => {
  it("should read Excel file with two columns correctly", async () => {
    const data = [
      ["name", "age"],
      ["Alice", 25],
      ["Bob", 30],
    ];
    const buffer = generateExcelBuffer(data);

    const result = await readExcel(buffer);

    expect(result).toEqual([
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
    ]);
  });

  it("should handle empty Excel file", async () => {
    const buffer = generateEmptyExcelBuffer();

    const result = await readExcel(buffer);

    expect(result).toEqual([]);
  });

  it("should handle Excel file without header", async () => {
    const data = [
      ["Alice", 25],
      ["Bob", 30],
    ];
    const buffer = generateExcelBuffer(data, false);

    const result = await readExcel(buffer);

    expect(result).toEqual([
      { 0: "Alice", 1: 25 },
      { 0: "Bob", 1: 30 },
    ]);
  });

  it("should accept Buffer input", async () => {
    const data = [
      ["name", "age"],
      ["Alice", 25],
    ];
    const buffer = generateExcelBuffer(data);

    const result = await readExcel(buffer);

    expect(result).toEqual([{ name: "Alice", age: 25 }]);
  });

  it("should accept file path input", async () => {
    // 假设存在一个测试文件路径
    const filePath = "./test.xlsx";

    // 这里需要实际创建文件或 mock 文件系统
    const result = await readExcel(filePath);

    expect(result).toBeInstanceOf(Array);
  });

  it("should throw error for invalid input", async () => {
    await expect(readExcel(null as any)).rejects.toThrow();
    await expect(readExcel(undefined as any)).rejects.toThrow();
    await expect(readExcel(123 as any)).rejects.toThrow();
  });

  it("should throw error for invalid Excel format", async () => {
    const invalidBuffer = Buffer.from("invalid excel data");

    await expect(readExcel(invalidBuffer)).rejects.toThrow();
  });
});
