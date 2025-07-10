import { Info } from "../types";

/**
 * LeetCode Problem: Guess Number Higher or Lower
 *
 * We’re playing a game: I pick a number in [1, n], and you try to guess it.
 * After each guess, you’re told whether your guess is too high, too low, or correct
 * via the API `guess(num)`. Return the picked number.
 *
 * Constraints:
 * - 1 <= n <= 2^31 - 1
 * - 1 <= pick <= n
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export const info: Info = {
  problemNumber: 374,
  problem: "Guess Number Higher or Lower",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  constraints: {
    range:    "1 <= n <= 2^31 - 1",
    pick:     "1 <= pick <= n"
  },
  exampleInput: "n = 10, pick = 6",
  expectedOutput: "6",
  runtime:           29,     // ms
  runtimePercentile: 99.5,  // %
  memory:            55.6,  // MB
  memoryPercentile:  54.37,  // %
  note: "Use unsigned right‐shift for midpoint: (low+high)>>>1 to avoid overflow and expensive Math.floor/divide."
};

// LeetCode API (do not implement)
declare function guess(num: number): -1 | 0 | 1;

/**
 * Perform a binary search on [1..n], using `guess(mid)` to guide us.
 * Uses (low + high) >>> 1 for fast midpoint calc.
 */
export function guessNumber(n: number): number {
  let low = 1, high = n;
  while (low <= high) {
    const mid = (low + high) >>> 1;   // faster than Math.floor((low+high)/2)
    const res = guess(mid);
    if (res === 0) return mid;
    if (res < 0) high = mid - 1;
    else          low  = mid + 1;
  }
  return -1; // (unreachable per problem)
}
