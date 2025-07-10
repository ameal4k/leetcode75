import { Info } from "../types";

export const info: Info = {
  problemNumber: 216,
  problem: "Combination Sum III",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(2⁹ · k)",      // exploring subsets of {1…9}, building combinations of length k
  spaceComplexity: "O(k)",         // recursion stack + current path of length ≤ k
  constraints: {
    k: "2 <= k <= 9",
    n: "1 <= n <= 60"
  },
  exampleInput: "k = 3, n = 7",
  expectedOutput: "[[1,2,4]]",
  runtime:           0,   // e.g. 0 ms
  runtimePercentile: 100,   // e.g. 100.00%
  memory:            55.15,   // e.g. 39.2 MB
  memoryPercentile:  87.62,   // e.g. 90.00%
  note: "Backtrack through numbers 1…9, prune when sum exceeds n or remaining slots can't be filled."
};

/**
 * Return all size-k combinations of distinct numbers 1…9 that sum to n.
 */
export function combinationSum3(k: number, n: number): number[][] {
  const results: number[][] = [];
  const combo: number[] = [];

  function backtrack(start: number, remaining: number, slots: number) {
    // If we've picked k numbers and remaining sum is 0, record a solution
    if (slots === 0) {
      if (remaining === 0) {
        results.push(combo.slice());
      }
      return;
    }
    // Prune: if remaining sum too small or too large for available numbers
    // smallest possible sum = (start) + (start+1) + … next slots numbers
    let minSum = 0;
    for (let i = 0; i < slots; i++) {
      minSum += start + i;
    }
    // largest possible sum = 9 + 8 + … last slots numbers
    let maxSum = 0;
    for (let i = 0; i < slots; i++) {
      maxSum += 9 - i;
    }
    if (remaining < minSum || remaining > maxSum) {
      return;
    }

    // Try each candidate from start…9
    for (let num = start; num <= 9; num++) {
      combo.push(num);
      backtrack(num + 1, remaining - num, slots - 1);
      combo.pop();
    }
  }

  backtrack(1, n, k);
  return results;
}

// 🔥 Example Tests
// console.log(combinationSum3(3, 7)); // [[1,2,4]]
// console.log(combinationSum3(3, 9)); // [[1,2,6],[1,3,5],[2,3,4]]
// console.log(combinationSum3(4, 1)); // []
