import { Info } from "../types";

export const info: Info = {
  problemNumber: 1318,
  problem: "Minimum Flips to Make a OR b Equal to c",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(1)",    // constant–time bitwise ops & two popcounts
  spaceComplexity: "O(1)",   // no extra data structures
  constraints: {
    range: "1 <= a, b, c <= 10^9"
  },
  exampleInput: { a: 2, b: 6, c: 5 },
  expectedOutput: 3,

  // ← run this on LeetCode and fill in the real numbers:
  runtime: 36,           // e.g. 24
  runtimePercentile: 86.49, // e.g. 95.XX
  memory: 54.6,            // e.g. 53.XX
  memoryPercentile: 70.27,  // e.g. 63.XX

  note: "Use two popcount loops (Kernighan’s method) instead of per-bit branching."
};

/**
 * We compute:
 *   x = (a|b)^c   → counts bits where a|b differs from c (needs 1 flip if c bit=1)
 *   y = a&b&~c   → counts bits where both a and b are 1 but c is 0 (needs 2 flips)
 * Then flips = popcount(x) + popcount(y).
 */
function minFlips(a: number, b: number, c: number): number {
  let flips = 0;

  // x captures all bit-positions where (a|b) != c
  let x = (a | b) ^ c;
  // y captures positions where both a & b are 1 but c is 0
  let y = a & b & ~c;

  // popcount x
  while (x !== 0) {
    x &= x - 1;
    flips++;
  }

  // popcount y
  while (y !== 0) {
    y &= y - 1;
    flips++;
  }

  return flips;
}

// 🔥 Quick sanity checks
console.log(minFlips(2, 6, 5)); // 3
console.log(minFlips(4, 2, 7)); // 1
console.log(minFlips(1, 2, 3)); // 0
