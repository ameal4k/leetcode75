import { Info } from "../types";

export const info: Info = {
  problemNumber: 452,
  problem: "Minimum Number of Arrows to Burst Balloons",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n log n)",  // in-place sort by end coordinate
  spaceComplexity: "O(log n)",   // sort recursion stack only
  constraints: {
    n:         "1 ≤ points.length ≤ 10⁵",
    pairSize:  "points[i].length == 2",
    range:     "-2³¹ ≤ xstart < xend ≤ 2³¹−1"
  },
  exampleInput:    "points = [[10,16],[2,8],[1,6],[7,12]]",
  expectedOutput:  "2",
  runtime:           78,  // e.g. 70 ms
  runtimePercentile: 90.22,  // e.g. 92.34%
  memory:            78.7,  // e.g. 45.6 MB
  memoryPercentile:  91.11,  // e.g. 68.21%
  note: "Sort the original array of pairs by x-end in place and then do one pass with O(1) extra space."
};

export function findMinArrowShots(points: number[][]): number {
  const n = points.length;
  if (n === 0) return 0;

  // sort in-place by the end-coordinate
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let curEnd = points[0][1];

  for (let i = 1; i < n; i++) {
    // if the next balloon starts after our current arrow position
    if (points[i][0] > curEnd) {
      arrows++;
      curEnd = points[i][1];
    }
  }

  return arrows;
}

// 🔥 Example Test Cases
// console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2
// console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]]));  // 4
// console.log(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]]));  // 2
