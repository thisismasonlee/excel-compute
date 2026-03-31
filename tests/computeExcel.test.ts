import { describe, it, expect } from "vitest";
import { computeExcel } from "../src/index";

describe("computeExcel function", () => {
  it("should compute using formula", async () => {
    const options = {
      file: Buffer.from("mock excel data"),
      formula: "A * B",
      columnA: "value1",
      columnB: "value2",
      resultColumn: "result",
    };

    const result = await computeExcel(options);

    expect(result).toEqual([
      { value1: 2, value2: 3, result: 6 },
      { value1: 4, value2: 5, result: 20 },
    ]);
  });

  it("should compute using computeFn", async () => {
    const options = {
      file: Buffer.from("mock excel data"),
      computeFn: (a: number, b: number) => a + b,
      columnA: "value1",
      columnB: "value2",
      resultColumn: "result",
    };

    const result = await computeExcel(options);

    expect(result).toEqual([
      { value1: 2, value2: 3, result: 5 },
      { value1: 4, value2: 5, result: 9 },
    ]);
  });

  it("should write to specified resultColumn", async () => {
    const options = {
      file: Buffer.from("mock excel data"),
      formula: "A + B",
      columnA: "value1",
      columnB: "value2",
      resultColumn: "sum",
    };

    const result = await computeExcel(options);

    expect(result[0]).toHaveProperty("sum");
    expect(result[0].sum).toBe(5);
  });

  it("should throw error for invalid column names", async () => {
    const options = {
      file: Buffer.from("mock excel data"),
      formula: "A * B",
      columnA: "nonExistentColumn",
      columnB: "value2",
      resultColumn: "result",
    };

    await expect(computeExcel(options)).rejects.toThrow();
  });

  it("should handle empty file", async () => {
    const options = {
      file: Buffer.from("empty excel data"),
      formula: "A * B",
      columnA: "value1",
      columnB: "value2",
      resultColumn: "result",
    };

    const result = await computeExcel(options);

    expect(result).toEqual([]);
  });

  it("should handle multiple rows of data", async () => {
    const options = {
      file: Buffer.from("mock excel data"),
      formula: "A - B",
      columnA: "value1",
      columnB: "value2",
      resultColumn: "difference",
    };

    const result = await computeExcel(options);

    expect(result).toHaveLength(2);
    expect(result[0].difference).toBe(-1);
    expect(result[1].difference).toBe(-1);
  });

  it("should throw error when neither formula nor computeFn is provided", async () => {
    const options = {
      file: Buffer.from("mock excel data"),
      columnA: "value1",
      columnB: "value2",
      resultColumn: "result",
    };

    await expect(computeExcel(options as any)).rejects.toThrow();
  });

  it("should throw error when file is not provided", async () => {
    const options = {
      formula: "A * B",
      columnA: "value1",
      columnB: "value2",
      resultColumn: "result",
    };

    await expect(computeExcel(options as any)).rejects.toThrow();
  });
});
