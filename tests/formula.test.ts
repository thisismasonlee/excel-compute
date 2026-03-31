import { describe, it, expect } from "vitest";
import { createFormulaCompute } from "../src/index";

describe("createFormulaCompute function", () => {
  it('should handle multiplication formula "A * B"', () => {
    const compute = createFormulaCompute("A * B", "value1", "value2");

    const result = compute(5, 3);
    expect(result).toBe(15);
  });

  it('should handle addition formula "A + B"', () => {
    const compute = createFormulaCompute("A + B", "value1", "value2");

    const result = compute(5, 3);
    expect(result).toBe(8);
  });

  it('should handle subtraction formula "A - B"', () => {
    const compute = createFormulaCompute("A - B", "value1", "value2");

    const result = compute(5, 3);
    expect(result).toBe(2);
  });

  it('should handle division formula "A / B"', () => {
    const compute = createFormulaCompute("A / B", "value1", "value2");

    const result = compute(6, 3);
    expect(result).toBe(2);
  });

  it("should throw error for invalid formula", () => {
    expect(() => createFormulaCompute("A ** B", "value1", "value2")).toThrow();
    expect(() => createFormulaCompute("invalid", "value1", "value2")).toThrow();
  });

  it("should protect against injection attacks", () => {
    expect(() =>
      createFormulaCompute('A; console.log("injection")', "value1", "value2"),
    ).toThrow();
    expect(() =>
      createFormulaCompute("A + B; process.exit()", "value1", "value2"),
    ).toThrow();
  });

  it("should handle empty formula", () => {
    expect(() => createFormulaCompute("", "value1", "value2")).toThrow();
  });

  it("should handle formula with spaces", () => {
    const compute = createFormulaCompute("A + B", "value1", "value2");

    const result = compute(5, 3);
    expect(result).toBe(8);
  });

  it("should handle formula with parentheses", () => {
    const compute = createFormulaCompute("(A + B) * 2", "value1", "value2");

    const result = compute(5, 3);
    expect(result).toBe(16);
  });
});
