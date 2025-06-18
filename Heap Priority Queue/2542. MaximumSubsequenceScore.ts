import { Info } from "../types";

export const info: Info = {
  problemNumber: 2542,
  problem: "Maximum Subsequence Score",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n \log k)", // sorting + heap operations per element
  spaceComplexity: "O(k)", // heap of size k
  constraints: {
    length: "1 <= nums1.length == nums2.length == n <= 10^5",
    values: "0 <= nums1[i], nums2[i] <= 10^5",
    subseqSize: "1 <= k <= n"
  },
  exampleInput: { nums1: [1,3,3,2], nums2: [2,1,3,4], k: 3 },
  expectedOutput: 12,
  runtime: 118,
  runtimePercentile: 100,
  memory: 83.02,
  memoryPercentile: 100,
  note: "Sort by nums2 descending, maintain a min-heap of selected nums1 values of size k, track sum * current nums2."
};

// Simple MinHeap implementation
class MinHeap {
  data: number[] = [];
  size(): number { return this.data.length; }
  push(val: number): void {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  pop(): number | undefined {
    const n = this.data.length;
    if (!n) return undefined;
    const res = this.data[0];
    const last = this.data.pop()!;
    if (n > 1) {
      this.data[0] = last;
      let i = 0;
      const half = (this.data.length >> 1);
      while (i < half) {
        let smallest = i;
        const l = 2 * i + 1;
        const r = l + 1;
        if (l < this.data.length && this.data[l] < this.data[smallest]) smallest = l;
        if (r < this.data.length && this.data[r] < this.data[smallest]) smallest = r;
        if (smallest === i) break;
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      }
    }
    return res;
  }
}

function maxScore(nums1: number[], nums2: number[], k: number): number {
  const n = nums1.length;
  // pair and sort by nums2 descending
  const idx = Array.from({ length: n }, (_, i) => i);
  idx.sort((a, b) => nums2[b] - nums2[a]);

  const heap = new MinHeap();
  let sum = 0;
  let res = 0;

  for (const i of idx) {
    heap.push(nums1[i]);
    sum += nums1[i];
    if (heap.size() > k) {
      sum -= heap.pop()!;
    }
    if (heap.size() === k) {
      res = Math.max(res, sum * nums2[i]);
    }
  }

  return res;
}

// 🔥 Example Test
console.log(maxScore([1,3,3,2], [2,1,3,4], 3)); // Expected 12
