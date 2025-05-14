import { Info } from "../types";

export const info: Info = {
  problemNumber: 199,
  problem: "Binary Tree Right Side View",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)", // visit every node once
  spaceComplexity: "O(w)", // w = max width of tree (queue)
  constraints: {
    nodeCount: "0 <= number of nodes <= 100",
    nodeValueRange: "-100 <= Node.val <= 100"
  },
  exampleInput: "[1,2,3,null,5,null,4]",
  expectedOutput: [1,3,4],
  runtime: 0,
  runtimePercentile: 100,
  memory: 57.96,
  memoryPercentile: 20.69,
  note: "Level‑order BFS capturing the last node value at each depth."
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

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (i === levelSize - 1) res.push(node.val); // rightmost at this level
    }
  }
  return res;
}

// 🔥 To test, build tree arrays into nodes before calling.
