import { Info } from "../types";

export const info: Info = {
  problemNumber: 1448,
  problem: "Count Good Nodes in Binary Tree",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)", // Each node is visited once
  spaceComplexity: "O(h)", // h = height of tree due to recursion stack
  constraints: {
    nodeCount: "1 <= number of nodes <= 10^5",
    nodeValueRange: "-10^4 <= Node.val <= 10^4"
  },
  exampleInput: "[3,1,4,3,null,1,5]",
  expectedOutput: 4,
  runtime: 106,
  runtimePercentile: 88.06,
  memory: 77.73,
  memoryPercentile: 86.99,
  note: "Optimized DFS that avoids unnecessary recursion paths by passing maxSoFar through each branch."
};

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function goodNodes(root: TreeNode | null): number {
  let count = 0;

  function dfs(node: TreeNode | null, maxSoFar: number): void {
    if (!node) return;
    if (node.val >= maxSoFar) count++;
    const nextMax = Math.max(maxSoFar, node.val); // reliable built‑in, usually well‑inlined
    dfs(node.left, nextMax);
    dfs(node.right, nextMax);
  }

  if (root) dfs(root, root.val); // start with root value, avoids unnecessary comparisons
  return count;
}
