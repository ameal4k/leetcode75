import { Info } from "../types";

export const info: Info = {
  problemNumber: 1372,
  problem: "Longest ZigZag Path in a Binary Tree",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)", // We visit each node once
  spaceComplexity: "O(h)", // h = height of tree, due to recursion stack
  constraints: {
    nodeCount: "1 <= number of nodes <= 5 * 10^4",
    nodeValue: "1 <= Node.val <= 100"
  },
  exampleInput: "[1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]",
  expectedOutput: 3,
  runtime: 5,
  runtimePercentile: 99.16,
  memory: 77.62,
  memoryPercentile: 94.54,
  note: "Optimized DFS starting once from root, directionally tracking the zigzag depth."
};

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function longestZigZag(root: TreeNode | null): number {
  let maxLen = 0;

  function dfs(node: TreeNode | null, isLeft: boolean, length: number): void {
    if (!node) return;
    maxLen = Math.max(maxLen, length);
    dfs(node.left, false, isLeft ? length + 1 : 1);
    dfs(node.right, true, isLeft ? 1 : length + 1);
  }

  dfs(root, true, 0);

  return maxLen;
}

// 🔥 Example Test Cases
// Tree structure not easy to simulate inline, but testing should use a helper to build the tree from an array
