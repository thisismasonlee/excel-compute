export function createFormulaCompute(
  formula: string,
  columnA: string,
  columnB: string,
): (a: number, b: number) => number {
  // 检查公式是否为空
  if (!formula || formula.trim() === "") {
    throw new Error("Formula cannot be empty");
  }

  // 检查是否包含潜在的注入攻击
  const dangerousPatterns = [
    /console\.log/,
    /process\.exit/,
    /require\(/,
    /import\(/,
    /eval\(/,
    /new\s+Function/,
    /\bexec\(/,
    /\bspawn\(/,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(formula)) {
      throw new Error("Formula contains dangerous code");
    }
  }

  // 替换公式中的 A 和 B 为变量
  let processedFormula = formula
    .trim()
    .replace(/\bA\b/g, "a")
    .replace(/\bB\b/g, "b");

  // 验证公式是否只包含允许的字符
  const allowedChars = /^[a-b+\-*/()\s\d.]+$/;
  if (!allowedChars.test(processedFormula)) {
    throw new Error("Formula contains invalid characters");
  }

  // 检查是否包含无效的运算符
  const invalidOperators = [
    "**",
    "//",
    "&&",
    "||",
    "!",
    "==",
    "!=",
    "===",
    "!==",
    ">",
    "<",
    ">=",
    "<=",
  ];
  for (const operator of invalidOperators) {
    if (processedFormula.includes(operator)) {
      throw new Error("Formula contains invalid operator: " + operator);
    }
  }

  // 简单的表达式解析器
  function parseExpression(expr: string): (a: number, b: number) => number {
    // 移除所有空格
    expr = expr.replace(/\s/g, "");

    // 处理括号
    if (expr.includes("(")) {
      const openIndex = expr.indexOf("(");
      const closeIndex = findMatchingParenthesis(expr, openIndex);
      if (closeIndex === -1) {
        throw new Error("Mismatched parentheses");
      }

      const innerExpr = expr.substring(openIndex + 1, closeIndex);
      const innerFn = parseExpression(innerExpr);

      // 替换括号部分为临时函数调用
      const replacedExpr =
        expr.substring(0, openIndex) +
        "inner(a,b)" +
        expr.substring(closeIndex + 1);

      return (a, b) => {
        const innerResult = innerFn(a, b);
        return parseExpression(
          replacedExpr.replace("inner(a,b)", innerResult.toString()),
        )(a, b);
      };
    }

    // 处理乘除法
    if (expr.includes("*") || expr.includes("/")) {
      const parts = splitExpression(expr, ["*", "/"]);
      return (a, b) => {
        let result = evaluatePart(parts[0], a, b);
        for (let i = 1; i < parts.length; i += 2) {
          const operator = parts[i];
          const value = evaluatePart(parts[i + 1], a, b);
          if (operator === "*") {
            result *= value;
          } else if (operator === "/") {
            if (value === 0) {
              throw new Error("Division by zero");
            }
            result /= value;
          }
        }
        return result;
      };
    }

    // 处理加减法
    if (expr.includes("+") || expr.includes("-")) {
      const parts = splitExpression(expr, ["+", "-"]);
      return (a, b) => {
        let result = evaluatePart(parts[0], a, b);
        for (let i = 1; i < parts.length; i += 2) {
          const operator = parts[i];
          const value = evaluatePart(parts[i + 1], a, b);
          if (operator === "+") {
            result += value;
          } else if (operator === "-") {
            result -= value;
          }
        }
        return result;
      };
    }

    // 处理单个值
    return (a, b) => evaluatePart(expr, a, b);
  }

  function findMatchingParenthesis(expr: string, openIndex: number): number {
    let count = 1;
    for (let i = openIndex + 1; i < expr.length; i++) {
      if (expr[i] === "(") {
        count++;
      } else if (expr[i] === ")") {
        count--;
        if (count === 0) {
          return i;
        }
      }
    }
    return -1;
  }

  function splitExpression(expr: string, operators: string[]): string[] {
    const parts: string[] = [];
    let current = "";

    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if (operators.includes(char)) {
        if (current) {
          parts.push(current);
          current = "";
        }
        parts.push(char);
      } else {
        current += char;
      }
    }

    if (current) {
      parts.push(current);
    }

    return parts;
  }

  function evaluatePart(part: string, a: number, b: number): number {
    if (part === "a") {
      return a;
    } else if (part === "b") {
      return b;
    } else {
      const num = parseFloat(part);
      if (isNaN(num)) {
        throw new Error("Invalid expression part: " + part);
      }
      return num;
    }
  }

  try {
    return parseExpression(processedFormula);
  } catch (error) {
    throw new Error(
      "Invalid formula: " +
        (error instanceof Error ? error.message : "Unknown error"),
    );
  }
}
