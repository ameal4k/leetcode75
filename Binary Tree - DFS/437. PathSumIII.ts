import { Info } from "../types";

export const info: Info = {
  problemNumber: 437,
  problem: "Path Sum III",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)", // We visit each node once and use prefix sum technique
  spaceComplexity: "O(h)", // h = height of tree due to recursion stack
  constraints: {
    nodeCount: "0 <= number of nodes <= 1000",
    nodeValue: "-10^9 <= Node.val <= 10^9",
    targetSum: "-1000 <= targetSum <= 1000"
  },
  exampleInput: "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8",
  expectedOutput: 3,
  runtime: 3,
  runtimePercentile: 83.23,
  memory: 60.54,
  memoryPercentile: 92.07,
  note: "Uses prefix sum and backtracking to efficiently count valid paths."
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

function pathSum(root: TreeNode | null, targetSum: number): number {
  const prefixSum = new Map<number, number>();
  prefixSum.set(0, 1);

  function dfs(node: TreeNode | null, currSum: number): number {
    if (!node) return 0;

    currSum += node.val;
    let count = prefixSum.get(currSum - targetSum) || 0;

    prefixSum.set(currSum, (prefixSum.get(currSum) || 0) + 1);
    count += dfs(node.left, currSum);
    count += dfs(node.right, currSum);
    prefixSum.set(currSum, prefixSum.get(currSum)! - 1); // backtrack

    return count;
  }

  return dfs(root, 0);
}
