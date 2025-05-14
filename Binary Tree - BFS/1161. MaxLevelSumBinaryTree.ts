import { Info } from "../types";

export const info: Info = {
  problemNumber: 1161,
  problem: "Maximum Level Sum of a Binary Tree",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)", // one BFS traversal through all nodes
  spaceComplexity: "O(w)", // w = maximum width of the tree (queue)
  constraints: {
    nodeCount: "1 <= number of nodes <= 10^4",
    nodeValueRange: "-10^5 <= Node.val <= 10^5"
  },
  exampleInput: "[1,7,0,7,-8,null,null]",
  expectedOutput: 2,
  runtime: 5,
  runtimePercentile: 95.9,
  memory: 75.35,
  memoryPercentile: 55.63,
  note: "Level-order BFS computing sum per level and tracking the maximum."
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

function maxLevelSum(root: TreeNode | null): number {
  if (!root) return 0;

  // Use an array as queue with pointer index to avoid costly shift()
  const queue: TreeNode[] = [root];
  let front = 0; // points to current element

  let level = 1;
  let bestLevel = 1;
  let bestSum = -Infinity;

  while (front < queue.length) {
    const levelSize = queue.length - front; // nodes remaining in this level
    let sum = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue[front++];
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (sum > bestSum) {
      bestSum = sum;
      bestLevel = level;
    }
    level++;
  }

  return bestLevel;
}
