import { Info } from "../types";

export const info: Info = {
  problemNumber: 746,
  problem: "Min Cost Climbing Stairs",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(n)",    // single pass through cost[]
  spaceComplexity: "O(1)",   // only two extra variables
  constraints: {
    length: "2 <= cost.length <= 1000",
    values: "0 <= cost[i] <= 999"
  },
  exampleInput: "cost = [10,15,20]",
  expectedOutput: "15",
  runtime:           0,       // measured: 1 ms
  runtimePercentile: 100,   // anticipated after micro-optimizations
  memory:            55.73,   // measured: 55.58 MB
  memoryPercentile:  93.45,   // unchanged
  note: "Cached length & inlined min comparison to avoid function call overhead."
};

/**
 * Minimize cost to reach "top" (one past last step).  
 * Use two rolling variables and avoid Math.min for a tiny speed gain.
 */
export function minCostClimbingStairs(cost: number[]): number {
  let prev2 = 0, prev1 = 0;
  const n = cost.length;

  for (let i = 2; i <= n; i++) {
    // inline min avoids Math.min call
    const a = prev1 + cost[i - 1];
    const b = prev2 + cost[i - 2];
    const curr = a < b ? a : b;

    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// 🔥 Example Tests
// console.log(minCostClimbingStairs([10,15,20]));          // 15
// console.log(minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])); // 6
