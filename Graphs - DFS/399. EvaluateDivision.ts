import { Info } from "../types";

export const info: Info = {
  problemNumber: 399,
  problem: "Evaluate Division",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(E + Q * α(V))", // union‑find + queries
  spaceComplexity: "O(V)",
  constraints: {
    equations: "1 <= equations.length <= 20",
    queries: "1 <= queries.length <= 20"
  },
  exampleInput: {
    equations: [["a","b"],["b","c"]],
    values: [2.0,3.0],
    queries: [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
  },
  expectedOutput: [6.0,0.5,-1.0,1.0,-1.0],
  runtime: undefined,
  runtimePercentile: undefined,
  memory: undefined,
  memoryPercentile: undefined,
  note: "Union‑Find with weighted edges: parent map holds ratio to parent; answer query via finding roots and ratio between."
};

class UF {
  parent: Map<string,string> = new Map();
  weight: Map<string,number> = new Map(); // ratio to parent

  find(x: string): [string,number] {
    if (!this.parent.has(x)) {
      this.parent.set(x,x);
      this.weight.set(x,1);
    }
    if (this.parent.get(x)! === x) return [x,1];
    const [root, w] = this.find(this.parent.get(x)!);
    const newWeight = this.weight.get(x)! * w;
    this.parent.set(x, root);
    this.weight.set(x, newWeight);
    return [root, newWeight];
  }

  union(a: string, b: string, ratio: number): void {
    const [ra, wa] = this.find(a);
    const [rb, wb] = this.find(b);
    if (ra === rb) return;
    // set parent of ra to rb: wa * ? = ratio * wb  =>  ? = ratio * wb / wa
    this.parent.set(ra, rb);
    this.weight.set(ra, (ratio * wb) / wa);
  }

  query(a: string, b: string): number {
    if (!this.parent.has(a) || !this.parent.has(b)) return -1;
    const [ra, wa] = this.find(a);
    const [rb, wb] = this.find(b);
    if (ra !== rb) return -1;
    return wa / wb;
  }
}

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  // Build adjacency list graph with ratio weights
  const graph: Map<string, [string, number][]> = new Map();
  const addEdge = (u: string, v: string, w: number) => {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u)!.push([v, w]);
  };
  for (let i = 0; i < equations.length; i++) {
    const [u, v] = equations[i];
    const w = values[i];
    addEdge(u, v, w);
    addEdge(v, u, 1 / w);
  }

  const res: number[] = [];
  for (const [src, dst] of queries) {
    if (!graph.has(src) || !graph.has(dst)) {
      res.push(-1);
      continue;
    }
    if (src === dst) {
      res.push(1);
      continue;
    }
    // DFS with stack, track ratio
    const stack: [string, number][] = [[src, 1]];
    const seen: Set<string> = new Set([src]);
    let found = -1;
    while (stack.length) {
      const [node, ratio] = stack.pop()!;
      if (node === dst) {
        found = ratio;
        break;
      }
      for (const [nei, w] of graph.get(node)!) {
        if (!seen.has(nei)) {
          seen.add(nei);
          stack.push([nei, ratio * w]);
        }
      }
    }
    res.push(found);
  }
  return res;
}