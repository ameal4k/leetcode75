import { Info } from "../types";

export const info: Info = {
  problemNumber: 1466,
  problem: "Reorder Routes to Make All Paths Lead to City Zero",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)", // DFS visits each edge once
  spaceComplexity: "O(n)", // adjacency list + recursion/stack
  constraints: {
    nRange: "2 <= n <= 5*10^4",
    edges: "connections.length == n-1"
  },
  exampleInput: {
    n: 6,
    connections: [[0,1],[1,3],[2,3],[4,0],[4,5]]
  },
  expectedOutput: 3,
  runtime: 256,
  runtimePercentile: 81.15,
  memory: 98.5,
  memoryPercentile: 69.11,
  note: "Build undirected graph where each edge stores original direction; DFS/BFS from 0 counting edges that need reversal."
};

function minReorder(n: number, connections: number[][]): number {
  const adj: [number, number][] [] = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) {
    adj[a].push([b, 1]); // original a->b direction
    adj[b].push([a, 0]); // reverse edge costs 0 to keep
  }
  let changes = 0;
  const stack: number[] = [0];
  const seen: Uint8Array = new Uint8Array(n);
  seen[0] = 1;
  while (stack.length) {
    const node = stack.pop()!;
    for (const [nei, needReverse] of adj[node]) {
      if (!seen[nei]) {
        changes += needReverse;
        seen[nei] = 1;
        stack.push(nei);
      }
    }
  }
  return changes;
}

// quick check
console.log(minReorder(3, [[1,0],[2,0]])); // 0
