import { Info } from "../types";

export const info: Info = {
  problemNumber: 215,
  problem: "Kth Largest Element in an Array",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n) average / O(n^2) worst", // Quickselect expected linear
  spaceComplexity: "O(1)", // in‑place partitioning
  constraints: {
    arrayLen: "1 <= k <= nums.length <= 10^5",
    valueRange: "-10^4 <= nums[i] <= 10^4"
  },
  exampleInput: {
    nums: [3,2,1,5,6,4],
    k: 2
  },
  expectedOutput: 5,
  runtime: 9,
  runtimePercentile: 94.43,
  memory: 68.66,
  memoryPercentile: 98.91,
  note: "In‑place Quickselect partitions around random pivot until index n‑k found."
};

function findKthLargest(nums: number[], k: number): number {
  const target = nums.length - k;
  let left = 0, right = nums.length - 1;
  while (true) {
    const [ltEnd, gtStart] = partitionThreeWay(nums, left, right);
    if (target < ltEnd) {
      right = ltEnd - 1;
    } else if (target >= gtStart) {
      left = gtStart;
    } else {
      return nums[target]; // within equal zone
    }
  }
}

// Dutch National Flag partition with random pivot; returns [ltEnd, gtStart]
function partitionThreeWay(arr: number[], l: number, r: number): [number, number] {
  const pivotIdx = l + (Math.random() * (r - l + 1) >> 0);
  const pivot = arr[pivotIdx];
  swap(arr, pivotIdx, r);

  let lt = l, i = l, gt = r;
  while (i <= gt) {
    if (arr[i] < pivot) {
      swap(arr, lt++, i++);
    } else if (arr[i] > pivot) {
      swap(arr, i, gt--);
    } else {
      i++;
    }
  }
  return [lt, gt + 1]; // equal zone is [lt, gt]
}

// Helper to swap two elements in-place
function swap(arr: number[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// 🔥 Quick sanity check
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // Expected 4
