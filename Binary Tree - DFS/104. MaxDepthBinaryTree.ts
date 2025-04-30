import { Info } from "../types";

export const info: Info = {
  problemNumber: 104,
  problem: "Maximum Depth of Binary Tree",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(n)", // visit every node once
  spaceComplexity: "O(h)", // recursion stack height
  constraints: {
    nodeCount: "0 <= number of nodes <= 10^4",
    nodeValueRange: "-100 <= Node.val <= 100",
  },
  exampleInput: "[3,9,20,null,null,15,7]",
  expectedOutput: 3,
  runtime: 0,
  runtimePercentile: 100.0,
  memory: 59.00,
  memoryPercentile: 66.68,
  note: "Recursive DFS returning 1 + max(depth(left), depth(right))."
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

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return (left > right ? left : right) + 1; // inline Math.max
}

// 🔥 Basic examples would require a tree builder for full tests.
