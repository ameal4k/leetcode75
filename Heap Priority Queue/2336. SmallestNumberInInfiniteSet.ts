import { Info } from "../types";

export const info: Info = {
  problemNumber: 2336,
  problem: "Smallest Number in Infinite Set",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(log n) per operation", // heap operations
  spaceComplexity: "O(n)", // heap and set
  constraints: {
    valueRange: "1 <= num <= 1000",
    calls: "<= 1000 calls to popSmallest and addBack"
  },
  exampleInput: null,
  expectedOutput: null,
  runtime: 14,
  runtimePercentile: 100,
  memory: 66.9,
  memoryPercentile: 42.4,
  note: "Maintain a min-heap of added-back numbers < cur, and a pointer cur for next unpopped integer."
};

class MinHeap {
  private data: number[] = [];
  size(): number { return this.data.length; }
  peek(): number | null { return this.data.length ? this.data[0] : null; }
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
  pop(): number | null {
    if (!this.data.length) return null;
    const ret = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length) {
      this.data[0] = last;
      let i = 0;
      const n = this.data.length;
      while (true) {
        let smallest = i;
        const l = 2*i + 1, r = 2*i + 2;
        if (l < n && this.data[l] < this.data[smallest]) smallest = l;
        if (r < n && this.data[r] < this.data[smallest]) smallest = r;
        if (smallest === i) break;
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      }
    }
    return ret;
  }
}

class SmallestInfiniteSet {
  private cur: number = 1;
  private heap = new MinHeap();
  private inHeap = new Set<number>();

  constructor() {}

  popSmallest(): number {
    if (this.heap.size()) {
      const x = this.heap.pop()!;
      this.inHeap.delete(x);
      return x;
    }
    return this.cur++;
  }

  addBack(num: number): void {
    if (num < this.cur && !this.inHeap.has(num)) {
      this.heap.push(num);
      this.inHeap.add(num);
    }
  }
}

// 🔥 Example Test
const obj = new SmallestInfiniteSet();
console.log(obj.popSmallest()); // 1
obj.addBack(2);
console.log(obj.popSmallest()); // 2
console.log(obj.popSmallest()); // 3
obj.addBack(1);
console.log(obj.popSmallest()); // 1
