import { Info } from "../types";

export const info: Info = {
  problemNumber: 198,
  problem: "House Robber",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)",    // Single pass through the array
  spaceComplexity: "O(1)",   // Only a few variables regardless of n
  constraints: {
    length: "1 <= nums.length <= 100",
    values: "0 <= nums[i] <= 400"
  },
  exampleInput: "nums = [2,7,9,3,1]",
  expectedOutput: "12",
  runtime:           0,  // e.g. 60 ms
  runtimePercentile: 100,  // e.g. 85.00%
  memory:            55.14,  // e.g. 38.5 MB
  memoryPercentile:  57.61,  // e.g. 90.00%
  note: "Use two rolling variables to track include/exclude for O(1) space."
};

/**
 * You are given an array of non-negative integers representing the
 * amount of money at each house. Adjacent houses cannot both be robbed.
 * Return the maximum amount you can rob.
 */
export function rob(nums: number[]): number {
  let prevNo = 0;  // max robbed so far if we skip the previous house
  let prevYes = 0; // max robbed so far if we rob the previous house

  for (const amt of nums) {
    const currNo = Math.max(prevNo, prevYes); // skip current: take best of previous
    const currYes = prevNo + amt;             // rob current: must skip previous

    prevNo = currNo;
    prevYes = currYes;
  }

  // the answer is the best of robbing or skipping the last house
  return Math.max(prevNo, prevYes);
}

// 🔥 Example Tests
// console.log(rob([1,2,3,1])); // Expected output: 4
// console.log(rob([2,7,9,3,1])); // Expected output: 12
