import { Info } from "../types";

export const info: Info = {
  problemNumber: 450,
  problem: "Delete Node in a BST",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(h)", // h = height of BST
  spaceComplexity: "O(h)", // recursion stack
  constraints: {
    nodeCount: "0 <= nodes <= 10^4",
    nodeValueRange: "-10^5 <= Node.val <= 10^5",
    keyRange: "-10^5 <= key <= 10^5"
  },
  exampleInput: {
    root: "[5,3,6,2,4,null,7]",
    key: 3
  },
  expectedOutput: "[5,4,6,2,null,null,7] (one valid answer)",
  runtime: 0,
  runtimePercentile: 100,
  memory: 66.53,
  memoryPercentile: 28.52,
  note: "Recursive delete handling 0, 1, 2 children; uses inorder successor for 2-child case."
};

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val ?? 0;
    this.left = left;
    this.right = right;
  }
}

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Found node to delete
    if (!root.left) return root.right; // only right child or none
    if (!root.right) return root.left; // only left child

    // Two children: replace with inorder successor (smallest in right subtree)
    let succParent = root;
    let succ = root.right;
    while (succ!.left) {
      succParent = succ!;
      succ = succ!.left;
    }
    // Copy successor value into root
    root.val = succ!.val;
    // Delete successor node
    if (succParent.left === succ) {
      succParent.left = succ!.right;
    } else {
      succParent.right = succ!.right;
    }
  }
  return root;
}

// 🧪 Build BST helper when testing.
