import { Info } from "../types";

export const info: Info = {
  problemNumber: 547,
  problem: "Number of Provinces",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n^2)", // we scan upper triangle once; Union‑Find operations are ~O(α(n))
  spaceComplexity: "O(n)", // parent array for Union‑Find
  constraints: {
    nRange: "1 <= n <= 200",
    matrixSquare: "n == isConnected.length == isConnected[i].length"
  },
  exampleInput: "[[1,1,0],[1,1,0],[0,0,1]]",
  expectedOutput: 2,
  runtime: 2,
  runtimePercentile: 80.54,
  memory: 58.87,
  memoryPercentile: 43.48,
  note: "Union‑Find (Disjoint Set) merges directly connected cities; count distinct roots."
};

class DSU {
  parent: Int16Array;
  rank: Uint8Array;
  count: number;
  constructor(n: number) {
    this.parent = new Int16Array(n);
    this.rank = new Uint8Array(n);
    for (let i = 0; i < n; i++) this.parent[i] = i;
    this.count = n;
  }
  find(x: number): number {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]];
      x = this.parent[x];
    }
    return x;
  }
  union(a: number, b: number): void {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return;
    if (this.rank[ra] < this.rank[rb]) {
      this.parent[ra] = rb;
    } else if (this.rank[ra] > this.rank[rb]) {
      this.parent[rb] = ra;
    } else {
      this.parent[rb] = ra;
      this.rank[ra]++;
    }
    this.count--;
  }
}

function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const dsu = new DSU(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1) dsu.union(i, j);
    }
  }
  return dsu.count;
}

// 🔥 Simple test
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // 2
