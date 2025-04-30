import { Info } from "../types";

export const info: Info = {
  problemNumber: 872,
  problem: "Leaf-Similar Trees",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(n + m)", // n = nodes in root1, m = nodes in root2
  spaceComplexity: "O(h1 + h2)", // recursion stacks: h1 = height(root1), h2 = height(root2)
  constraints: {
    nodeCount: "1 <= nodes in each tree <= 200",
    nodeValue: "0 <= Node.val <= 200"
  },
  exampleInput: {
    root1: "[3,5,1,6,2,9,8,null,null,7,4]",
    root2: "[3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]"
  },
  expectedOutput: true,
  runtime: 0,
  runtimePercentile: 100.0,
  memory: 58.18,
  memoryPercentile: 63.42,
  note: "DFS collects leaf values for each tree and compares sequences. Uses early exit for unequal lengths."  
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

function* leafGenerator(root: TreeNode | null): Generator<number> {
  const stack: TreeNode[] = [];
  let node: TreeNode | null = root;

  while (stack.length || node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop()!;
    if (!node.left && !node.right) yield node.val; // leaf
    node = node.right;
  }
}

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const gen1 = leafGenerator(root1);
  const gen2 = leafGenerator(root2);

  while (true) {
    const n1 = gen1.next();
    const n2 = gen2.next();
    if (n1.done && n2.done) return true; // both sequences finished
    if (n1.done || n2.done) return false; // lengths differ
    if (n1.value !== n2.value) return false; // mismatch
  }
}
