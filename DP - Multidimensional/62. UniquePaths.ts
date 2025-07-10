import { Info } from "../types";

export const info: Info = {
  problemNumber: 62,
  problem: "Unique Paths",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(min(m, n))",  // loop up to the smaller of (m-1) or (n-1)
  spaceComplexity: "O(1)",         // constant extra space
  constraints: {
    m: "1 <= m <= 100",
    n: "1 <= n <= 100"
  },
  exampleInput: "m = 3, n = 7",
  expectedOutput: "28",
  runtime:           0,    // e.g. 0 ms
  runtimePercentile: 100,    // e.g. 100.00%
  memory:            53.97,    // e.g. 38.5 MB
  memoryPercentile:  93.21,    // e.g. 95.00%
  note: "Compute C(m+n-2, m-1) using an iterative, overflow-safe approach."
};

/**
 * Returns the number of unique paths for an m×n grid,
 * moving only right or down, by computing the binomial coefficient:
 *   C(m+n-2, m-1) (or equivalently C(m+n-2, n-1)).
 */
export function uniquePaths(m: number, n: number): number {
  // Total moves = (m−1) downs + (n−1) rights = m+n−2
  const total = m + n - 2;
  // Choose the smaller of the two steps to reduce loop iterations
  const k = Math.min(m - 1, n - 1);
  let result = 1;

  // Compute C(total, k) = ∏_{i=1..k} (total - k + i) / i
  for (let i = 1; i <= k; i++) {
    result = result * (total - k + i) / i;
  }

  // Round to nearest integer to guard against floating‐point imprecision
  return Math.round(result);
}

// 🔥 Example Test Cases
// console.log(uniquePaths(3, 7)); // Expected output: 28
// console.log(uniquePaths(3, 2)); // Expected output: 3
