import { Info } from "../types";

export const info: Info = {
  problemNumber: 875,
  problem: "Koko Eating Bananas",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n log m)",    // n = piles.length, m = max(piles)
  spaceComplexity: "O(1)",         // only a few pointers/accumulators
  constraints: {
    n:       "1 <= piles.length <= 10^4",
    h:       "piles.length <= h <= 10^9",
    values:  "1 <= piles[i] <= 10^9"
  },
  exampleInput: "piles = [3,6,7,11], h = 8",
  expectedOutput: "4",
  runtime:           2,  // e.g. 10 ms
  runtimePercentile: 100,  // e.g. 60.48%
  memory:            59.07,  // e.g. 59.07 MB
  memoryPercentile:  72.96,  // e.g. 72.96%
  note: "Use bitwise operations for ceil division to avoid Math.floor overhead."
};

export function minEatingSpeed(piles: number[], h: number): number {
  let low = 1;
  let high = 0;
  const n = piles.length;
  // find maximum pile to bound high
  for (let i = 0; i < n; i++) {
    const p = piles[i];
    if (p > high) high = p;
  }

  // binary search on k
  while (low < high) {
    const mid = (low + high) >>> 1;

    // check how many hours needed at speed = mid
    let hours = 0;
    for (let i = 0; i < n; i++) {
      const p = piles[i];
      // ceil(p / mid) = (((p - 1) / mid) | 0) + 1
      hours += (((p - 1) / mid) | 0) + 1;
      if (hours > h) break;  // early exit
    }

    // narrow the search
    if (hours <= h) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

// 🔥 Example Tests
// console.log(minEatingSpeed([3,6,7,11], 8));  // 4
// console.log(minEatingSpeed([30,11,23,4,20], 5)); // 30
// console.log(minEatingSpeed([30,11,23,4,20], 6)); // 23
