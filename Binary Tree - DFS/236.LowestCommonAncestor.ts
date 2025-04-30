import { Info } from "../types";

export const info: Info = {
  problemNumber: 236,
  problem: "Lowest Common Ancestor of a Binary Tree",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)", // Each node is visited once in a post-order traversal
  spaceComplexity: "O(h)", // h = height of the tree; due to recursion stack
  constraints: {
    nodeCount: "2 <= number of nodes <= 10^5",
    nodeValueRange: "-10^9 <= Node.val <= 10^9",
    uniqueValues: "All Node.val are unique",
    nodeExistence: "p != q and both nodes exist in the tree"
  },
  exampleInput: {
    root: [3,5,1,6,2,0,8,null,null,7,4],
    p: 5,
    q: 1
  },
  expectedOutput: 3,
  runtime: 48, // in ms
  runtimePercentile: 97.3,
  memory: 65.88, // in MB
  memoryPercentile: 56.56,
  note: "Recursive post-order DFS that returns a non-null value up the stack only when p or q is found."
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

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode | null {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // ✅ If both sides return non-null, this root is the LCA
  if (left && right) return root;

  // ✅ Otherwise, return whichever side has a non-null value
  return left ?? right;
}
