import { Info } from "../types";

export const info: Info = {
  problemNumber: 700,
  problem: "Search in a Binary Search Tree",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(h)", // h = height of the BST
  spaceComplexity: "O(1)", // iterative; recursion would be O(h)
  constraints: {
    nodeCount: "1 <= number of nodes <= 5000",
    nodeValueRange: "1 <= Node.val <= 10^7",
    bstProperty: "root is a Binary Search Tree",
    searchValRange: "1 <= val <= 10^7"
  },
  exampleInput: {
    root: "[4,2,7,1,3]",
    val: 2
  },
  expectedOutput: "[2,1,3]",
  runtime: 0,
  runtimePercentile: 100,
  memory: 63.34,
  memoryPercentile: 24.43,
  note: "Iterative search leveraging BST ordering: move left if val < node.val, right otherwise."
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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let node = root;
  while (node) {
    if (val === node.val) return node;
    node = val < node.val ? node.left : node.right;
  }
  return null;
}

// 🧪 Build a BST from array for tests when needed.
