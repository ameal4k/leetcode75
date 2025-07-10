import { Info } from "../types";

export const info: Info = {
  problemNumber: 136,
  problem: "Single Number",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(n)",      // one pass through the array
  spaceComplexity: "O(1)",     // only a single accumulator variable
  constraints: {
    arrayLength: "1 <= nums.length <= 3 * 10^4",
    elementRange: "-3 * 10^4 <= nums[i] <= 3 * 10^4"
  },
  exampleInput: [4, 1, 2, 1, 2],
  expectedOutput: 4,
  runtime: 0,                  // ms
  runtimePercentile: 100,    // beats ~77.93% of TS submissions
  memory: 56.54,               // MB
  memoryPercentile: 82.83,     // beats ~57.13% of TS submissions
  note: "This is already optimal—XOR in a single pass with constant extra space."
};

function singleNumber(nums: number[]): number {
  // Bitwise XOR cancels out pairs: a^a = 0, so only the unique number remains.
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result ^= nums[i];
  }
  return result;
}

// 🔥 Example Test
console.log(singleNumber([2, 2, 1]));           // 1
console.log(singleNumber([4, 1, 2, 1, 2]));     // 4
console.log(singleNumber([1]));                 // 1
