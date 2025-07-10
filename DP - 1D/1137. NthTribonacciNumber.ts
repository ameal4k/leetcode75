import { Info } from "../types";

export const info: Info = {
  problemNumber: 1137,
  problem: "N-th Tribonacci Number",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(n)",    // single loop up to n
  spaceComplexity: "O(1)",   // only three rolling variables
  constraints: {
    n: "0 <= n <= 37"
  },
  exampleInput: "n = 4",
  expectedOutput: "4",
  runtime:           0,  // e.g.  4 ms
  runtimePercentile: 100,  // e.g. 85.00%
  memory:            55.64,  // e.g. 38.0 MB
  memoryPercentile:  10.17,  // e.g. 90.00%
  note: "Use three variables to iteratively build the Tribonacci sequence."
};

/**
 * The Tribonacci sequence is defined:
 *   T0 = 0, T1 = 1, T2 = 1,
 *   Tn = Tn-1 + Tn-2 + Tn-3  for n >= 3.
 * Return Tn.
 */
export function tribonacci(n: number): number {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;

  let t0 = 0, t1 = 1, t2 = 1;
  let tNext = 0;

  for (let i = 3; i <= n; i++) {
    tNext = t0 + t1 + t2;
    t0 = t1;
    t1 = t2;
    t2 = tNext;
  }

  return t2;
}

// 🔥 Example Tests
// console.log(tribonacci(4));  // Expected output: 4
// console.log(tribonacci(25)); // Expected output: 1389537
