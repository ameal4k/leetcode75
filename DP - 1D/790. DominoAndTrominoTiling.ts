import { Info } from "../types";

export const info: Info = {
  problemNumber: 790,
  problem: "Domino and Tromino Tiling",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)",    // one loop up to n
  spaceComplexity: "O(1)",   // only a handful of variables
  constraints: {
    n: "1 <= n <= 1000"
  },
  exampleInput: "n = 3",
  expectedOutput: "5",
  runtime:           1,  // e.g.  0 ms
  runtimePercentile: 82.93,  // e.g. 100.00%
  memory:            57.83,  // e.g. 39.0 MB
  memoryPercentile:  46.34,  // e.g. 90.00%
  note: "DP with rolling variables: f[i] = f[i-1] + f[i-2] + 2·g, g = g + f[i-2]."
};

/**
 * Return number of ways to tile a 2×n board using dominos and trominos,
 * modulo 10^9+7. 
 */
export function numTilings(n: number): number {
  const MOD = 1_000_000_007;
  if (n === 0) return 1;
  if (n === 1) return 1;

  // f0 = f[i-2], f1 = f[i-1], g = auxiliary sum = g[i-1]
  let f0 = 1, f1 = 1, g = 0, f = 0;

  for (let i = 2; i <= n; i++) {
    // g[i] = g[i-1] + f[i-2]
    const newG = (g + f0) % MOD;
    // f[i] = f[i-1] + f[i-2] + 2 * g[i-1]
    f = (f1 + f0 + 2 * g) % MOD;

    // roll
    f0 = f1;
    f1 = f;
    g = newG;
  }

  return f1;
}

// 🔥 Example Test
// console.log(numTilings(3)); // 5
// console.log(numTilings(1)); // 1
