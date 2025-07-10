import { Info } from "../types";

export const info: Info = {
  problemNumber: 435,
  problem: "Non-overlapping Intervals",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n log n)",  // sort + single pass
  spaceComplexity: "O(log n)",   // sort recursion stack
  constraints: {
    n:           "1 ≤ intervals.length ≤ 10⁵",
    pairSize:    "intervals[i].length == 2",
    valueRange:  "-5·10⁴ ≤ starti < endi ≤ 5·10⁴"
  },
  exampleInput:    "intervals = [[1,2],[2,3],[3,4],[1,3]]",
  expectedOutput:  "1",
  runtime:           65,  // e.g. 72 ms
  runtimePercentile: 97.66,  // e.g. 90.12%
  memory:            85.85,  // e.g. 45.3 MB
  memoryPercentile:  81.27,  // e.g. 78.45%
  note: "Sort intervals by end ascending, then greedily select maximal non-overlapping subset; answer = total – kept."
};

export function eraseOverlapIntervals(intervals: number[][]): number {
  const n = intervals.length;
  if (n === 0) return 0;

  // Sort in-place by end coordinate
  intervals.sort((a, b) => a[1] - b[1]);

  // Always keep the first interval's end
  let countKept = 1;
  let prevEnd = intervals[0][1];

  // Greedily keep any interval that starts at or after prevEnd
  for (let i = 1; i < n; i++) {
    if (intervals[i][0] >= prevEnd) {
      countKept++;
      prevEnd = intervals[i][1];
    }
  }

  // Minimum removals = total intervals – maximum non-overlapping kept
  return n - countKept;
}

// 🔥 Example Test Cases
// console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
// console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));       // 2
// console.log(eraseOverlapIntervals([[1,2],[2,3]]));             // 0
