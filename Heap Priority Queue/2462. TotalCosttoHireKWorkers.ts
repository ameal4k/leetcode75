import { Info } from "../types";

export const info: Info = {
  problemNumber: 2462,
  problem: "Total Cost to Hire K Workers",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O((k + candidates) log candidates)", // heap operations per hire
  spaceComplexity: "O(candidates)", // two heaps of size ≤ candidates
  constraints: {
    n: "1 <= costs.length <= 10^5",
    costRange: "1 <= costs[i] <= 10^5",
    parameters: "1 <= k, candidates <= costs.length"
  },
  exampleInput: { costs: [17,12,10,2,7,2,11,20,8], k: 3, candidates: 4 },
  expectedOutput: 11,
  runtime: 162, // ms

  runtimePercentile: 38.34, // %
  memory: 78.46, // MB
  memoryPercentile: 48.12, // %
  note: "This JS implementation is heavily optimized—flattened heaps and composite keys—yet JS engine overhead caps us around ~40%. Further gains require a compiled language solution (e.g., C++)."
};

// Composite value: (cost << SHIFT) | index
const SHIFT = 17; // since costs, indices < 2^17
const FACTOR = 1 << SHIFT; // divisor to extract cost

// Min-heap functions for number[]
function heapPush(heap: number[], x: number): void {
  let i = heap.push(x) - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (heap[p] <= heap[i]) break;
    [heap[p], heap[i]] = [heap[i], heap[p]];
    i = p;
  }
}

function heapPop(heap: number[]): number {
  const n = heap.length;
  const res = heap[0];
  const last = heap.pop()!;
  if (n > 1) {
    heap[0] = last;
    let i = 0, half = n >> 1;
    while (i < half) {
      let l = 2 * i + 1, r = l + 1, smallest = l;
      if (r < heap.length && heap[r] < heap[l]) smallest = r;
      if (heap[smallest] < heap[i]) {
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;
      } else break;
    }
  }
  return res;
}

function totalCost(costs: number[], k: number, candidates: number): number {
  const n = costs.length;
  let left = 0;
  let right = n - 1;
  const leftHeap: number[] = [];
  const rightHeap: number[] = [];
  let total = 0;

    // initialize front candidates
  for (let i = 0; i < candidates && left <= right; i++) {
    heapPush(leftHeap, costs[left] * FACTOR + left);
    left++;
  }

    // initialize back candidates
  for (let i = 0; i < candidates && left <= right; i++) {
    heapPush(rightHeap, costs[right] * FACTOR + right);
    right--;
  }


  for (let hired = 0; hired < k; hired++) {
    const ltop = leftHeap.length ? leftHeap[0] : Infinity;
    const rtop = rightHeap.length ? rightHeap[0] : Infinity;
    let comp: number;
    if (ltop <= rtop) {
      comp = heapPop(leftHeap);
      if (left <= right) {
        heapPush(leftHeap, costs[left] * FACTOR + left);
        left++;
      }
    } else {
      comp = heapPop(rightHeap);
      if (left <= right) {
        heapPush(rightHeap, costs[right] * FACTOR + right);
        right--;
      }
    }
    total += Math.floor(comp / FACTOR);
  }

  return total;
}

// 🔥 Example Test
console.log(totalCost([17,12,10,2,7,2,11,20,8], 3, 4)); // Expected 11(totalCost([17,12,10,2,7,2,11,20,8], 3, 4)); // Expected 11
