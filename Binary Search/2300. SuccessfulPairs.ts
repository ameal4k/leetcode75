import { Info } from "../types";

export const info: Info = {
  problemNumber: 2300,
  problem: "Successful Pairs of Spells and Potions",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(m log m + n log m)",  // sort potions (m log m) + binary search per spell (n log m)
  spaceComplexity: "O(n)",                // result array of length n
  constraints: {
    n:       "1 <= spells.length <= 10^5",
    m:       "1 <= potions.length <= 10^5",
    values:  "1 <= spells[i], potions[j] <= 10^5",
    success: "1 <= success <= 10^10"
  },
  exampleInput: "spells = [5,1,3], potions = [1,2,3,4,5], success = 7",
  expectedOutput: "[4,0,3]",
  runtime:           72, 
  runtimePercentile: 94.59, 
  memory:            84.64,  
  memoryPercentile:  88.11, 
  note: "Sort the potions array, then for each spell compute the minimal required potion strength via ceil(success/spell) and binary search for its first occurrence."
};

export function successfulPairs(
  spells: number[],
  potions: number[],
  success: number
): number[] {
  // Sort potions ascending for binary search
  potions.sort((a, b) => a - b);
  const m = potions.length;
  const res = new Array<number>(spells.length);

  for (let i = 0; i < spells.length; i++) {
    const spell = spells[i];
    // Compute ceil(success / spell) without floating: floor((success + spell - 1) / spell)
    const threshold = Math.floor((success + spell - 1) / spell);

    // Binary search lower bound of threshold in potions
    let lo = 0, hi = m;
    while (lo < hi) {
      const mid = lo + ((hi - lo) >>> 1);
      if (potions[mid] >= threshold) hi = mid;
      else lo = mid + 1;
    }

    // All potions from index lo to end form successful pairs
    res[i] = m - lo;
  }

  return res;
}

// 🔥 Example Tests
// console.log(successfulPairs([5,1,3], [1,2,3,4,5], 7)); // [4,0,3]
// console.log(successfulPairs([3,1,2], [8,5,8], 16));     // [2,0,2]
