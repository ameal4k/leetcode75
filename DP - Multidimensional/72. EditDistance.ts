import { Info } from "../types";

export const info: Info = {
  problemNumber: 72,
  problem: "Edit Distance",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(mn)",           // m = word1.length, n = word2.length
  spaceComplexity: "O(min(m, n))",   // two rolling arrays of length ~min(m,n)+1
  constraints: {
    word1Length: "0 <= word1.length <= 500",
    word2Length: "0 <= word2.length <= 500",
    characters: "word1 and word2 consist of lowercase English letters."
  },
  exampleInput: `word1 = "horse", word2 = "ros"`,
  expectedOutput: "3",
  runtime:           7,  // e.g.  4 ms
  runtimePercentile: 85.24,  // e.g. 95.00%
  memory:            58.03,  // e.g. 39.0 MB
  memoryPercentile:  100,  // e.g. 90.00%
  note: "Use two rolling arrays to reduce space to O(min(m,n))."
};

/**
 * Computes the minimum number of insertions, deletions, and substitutions
 * to transform word1 into word2 (the classic Levenshtein distance).
 * Uses O(min(m,n)) space by keeping only two rows of the DP table.
 */
export function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  // Ensure we use the shorter string for the DP columns
  if (n < m) {
    // swap to make n >= m
    return minDistance(word2, word1);
  }
  // Now n >= m, so we allocate arrays of size m+1
  const prev = new Array<number>(m + 1);
  const curr = new Array<number>(m + 1);

  // Base case: transforming "" into prefixes of word1
  for (let i = 0; i <= m; i++) {
    prev[i] = i;
  }

  for (let j = 1; j <= n; j++) {
    curr[0] = j;
    const c2 = word2.charAt(j - 1);
    for (let i = 1; i <= m; i++) {
      const c1 = word1.charAt(i - 1);
      const cost = c1 === c2 ? 0 : 1;
      // deletion from word1 (prev[i] + 1),
      // insertion to word1  (curr[i - 1] + 1),
      // substitution       (prev[i - 1] + cost)
      let v = prev[i] + 1;
      const ins = curr[i - 1] + 1;
      if (ins < v) v = ins;
      const sub = prev[i - 1] + cost;
      if (sub < v) v = sub;
      curr[i] = v;
    }
    // swap prev and curr rows for next iteration
    for (let k = 0; k <= m; k++) {
      prev[k] = curr[k];
    }
  }

  return prev[m];
}

// 🔥 Example Test Cases
// console.log(minDistance("horse", "ros"));        // 3
// console.log(minDistance("intention", "execution")); // 5
