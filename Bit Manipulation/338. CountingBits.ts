import { Info } from "../types";

export const info: Info = {
  problemNumber: 338,
  problem: "Counting Bits",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(n)",       // single pass with constant-time work per index
  spaceComplexity: "O(n)",      // result array of length n+1
  constraints: {
    nRange: "0 <= n <= 10^5",
  },
  exampleInput: 5,
  expectedOutput: [0,1,1,2,1,2],
  runtime: 0,                   // reported on LeetCode
  runtimePercentile: 100,     // reported on LeetCode
  memory: 61.91,                // reported on LeetCode (MB)
  memoryPercentile: 61.28,      // reported on LeetCode
  note: "Uses ans[i] = ans[i>>1] + (i&1) to avoid any string/array allocations.",
};

function countBits(n: number): number[] {
  // pre-allocate exactly n+1 slots
  const ans: number[] = new Array(n + 1);
  ans[0] = 0;

  // simple while‐loop with bit-shift and mask
  let i = 1;
  while (i <= n) {
    // ans[i>>1] is the count for floor(i/2), plus (i&1) adds 1 if LSB is set
    ans[i] = ans[i >> 1] + (i & 1);
    i++;
  }

  return ans;
}

// 🔥 Example Test
console.log(countBits(5)); // [0,1,1,2,1,2]
