import { Info } from "../types";

export const info: Info = {
  problemNumber: 739,
  problem: "Daily Temperatures",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)",    // each day is pushed/popped at most once
  spaceComplexity: "O(n)",   // answer array + stack up to n
  constraints: {
    n: "1 <= temperatures.length <= 10^5",
    range: "30 <= temperatures[i] <= 100"
  },
  exampleInput: "[73,74,75,71,69,72,76,73]",
  expectedOutput: "[1,1,4,2,1,1,0,0]",
  runtime:           13,  // e.g.  X ms
  runtimePercentile: 92.28,  // e.g.  Y%
  memory:            81.8,  // e.g.  Z MB
  memoryPercentile:  19.73,  // e.g.  W%
  note: "Monotonic decreasing stack of indices using a pre-allocated Int32Array for speed."
};

export function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const T = temperatures;
  const answer = new Array<number>(n).fill(0);

  // stack of indices, monotonic decreasing by temperature
  const stack = new Int32Array(n);
  let top = 0;

  for (let i = 0; i < n; i++) {
    const curr = T[i];
    // Pop all colder days
    while (top > 0 && T[stack[top - 1]] < curr) {
      const prevIndex = stack[--top];
      answer[prevIndex] = i - prevIndex;
    }
    // Push this day
    stack[top++] = i;
  }

  // Remaining indices have no warmer future day → answer stays 0
  return answer;
}

// 🔥 Example Test
// console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]
// console.log(dailyTemperatures([30,40,50,60]));             // [1,1,1,0]
// console.log(dailyTemperatures([30,60,90]));                // [1,1,0]
