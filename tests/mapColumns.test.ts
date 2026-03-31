import { describe, it, expect } from "vitest";
import { mapColumns } from "../src/index";

describe("mapColumns function", () => {
  it("should map columns correctly", () => {
    const data = [
      { id: 1, name: "Alice", age: 25 },
      { id: 2, name: "Bob", age: 30 },
      { id: 3, name: "Charlie", age: 35 },
    ];

    const result = mapColumns(data, "name", "age");

    expect(result).toEqual({
      Alice: 25,
      Bob: 30,
      Charlie: 35,
    });
  });

  it("should throw error when columnA does not exist", () => {
    const data = [
      { id: 1, name: "Alice", age: 25 },
      { id: 2, name: "Bob", age: 30 },
    ];

    expect(() => mapColumns(data, "nonExistentColumn", "age")).toThrow();
  });

  it("should throw error when columnB does not exist", () => {
    const data = [
      { id: 1, name: "Alice", age: 25 },
      { id: 2, name: "Bob", age: 30 },
    ];

    expect(() => mapColumns(data, "name", "nonExistentColumn")).toThrow();
  });

  it("should handle null values", () => {
    const data = [
      { id: 1, name: "Alice", age: null },
      { id: 2, name: "Bob", age: 30 },
    ];

    const result = mapColumns(data, "name", "age");

    expect(result).toEqual({
      Alice: null,
      Bob: 30,
    });
  });

  it("should handle undefined values", () => {
    const data = [
      { id: 1, name: "Alice", age: undefined },
      { id: 2, name: "Bob", age: 30 },
    ];

    const result = mapColumns(data, "name", "age");

    expect(result).toEqual({
      Alice: undefined,
      Bob: 30,
    });
  });

  it("should handle non-numeric values", () => {
    const data = [
      { id: 1, name: "Alice", age: "25" },
      { id: 2, name: "Bob", age: 30 },
      { id: 3, name: "Charlie", age: "thirty-five" },
    ];

    const result = mapColumns(data, "name", "age");

    expect(result).toEqual({
      Alice: "25",
      Bob: 30,
      Charlie: "thirty-five",
    });
  });

  it("should handle empty data array", () => {
    const data: any[] = [];

    const result = mapColumns(data, "name", "age");

    expect(result).toEqual({});
  });

  it("should handle duplicate keys by keeping the last value", () => {
    const data = [
      { id: 1, name: "Alice", age: 25 },
      { id: 2, name: "Alice", age: 26 },
    ];

    const result = mapColumns(data, "name", "age");

    expect(result).toEqual({
      Alice: 26,
    });
  });
});
