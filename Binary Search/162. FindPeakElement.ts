import { Info } from "../types";

export const info: Info = {
  problemNumber: 162,
  problem: "Find Peak Element",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(log n)",    // binary search on the array
  spaceComplexity: "O(1)",       // only a few pointers
  constraints: {
    n:        "1 <= nums.length <= 1000",
    values:   "-2^31 <= nums[i] <= 2^31 - 1",
    distinct: "nums[i] != nums[i+1] for all valid i"
  },
  exampleInput: "[1,2,3,1]",
  expectedOutput: "2",
  runtime:           0,  // e.g. 4 ms
  runtimePercentile: 100,  // e.g. 98.00%
  memory:            55.26,  // e.g. 40.5 MB
  memoryPercentile:  62.85,  // e.g. 85.00%
  note: "Use binary search: if nums[mid] < nums[mid+1], a peak lies to the right, else to the left (including mid)."
};

export function findPeakElement(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;
  // Invariant: a peak exists somewhere in [low, high]
  while (low < high) {
    const mid = (low + high) >>> 1;  // faster than Math.floor((low+high)/2)
    if (nums[mid] < nums[mid + 1]) {
      // ascending slope → peak is to the right
      low = mid + 1;
    } else {
      // descending slope → peak is at mid or to the left
      high = mid;
    }
  }
  return low;
}

// 🔥 Example Tests
// console.log(findPeakElement([1,2,3,1]));        // 2
// console.log(findPeakElement([1,2,1,3,5,6,4]));  // 1 or 5
