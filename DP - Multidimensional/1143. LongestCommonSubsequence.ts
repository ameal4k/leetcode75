import { Info } from "../types";

export const info: Info = {
  problemNumber: 1143,
  problem: "Longest Common Subsequence",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(m × n)",       // m = text1.length, n = text2.length
  spaceComplexity: "O(min(m, n))", // optimized to two rolling arrays
  constraints: {
    len1: "1 <= text1.length <= 1000",
    len2: "1 <= text2.length <= 1000",
    chars: "text1 and text2 consist of lowercase English letters"
  },
  exampleInput: `text1 = "abcde", text2 = "ace"`,
  expectedOutput: "3",
  runtime:           26,  // e.g.  56 ms
  runtimePercentile: 94.29,  // e.g. 80.00%
  memory:            56.97,  // e.g. 40.5 MB
  memoryPercentile:  95.8,  // e.g. 90.00%
  note: "Use two rolling DP rows of length min(m,n)+1 to save memory."
};

/**
 * Computes the length of the Longest Common Subsequence (LCS) between two strings.
 * Uses a dynamic programming approach with space optimized to O(min(m, n)).
 */
export function longestCommonSubsequence(text1: string, text2: string): number {
  // Ensure text2 is the shorter, to minimize DP row size
  if (text1.length < text2.length) {
    [text1, text2] = [text2, text1];
  }
  const m = text1.length;
  const n = text2.length;

  // Two rolling arrays: previous and current row
  const prev = new Array<number>(n + 1).fill(0);
  const curr = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
        // Match: extend the subsequence
        curr[j] = prev[j - 1] + 1;
      } else {
        // No match: take the max of left or top cell
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    // Swap rows for next iteration
    for (let k = 1; k <= n; k++) {
      prev[k] = curr[k];
      curr[k] = 0;
    }
  }

  return prev[n];
}

// 🔥 Example Test Cases
// console.log(longestCommonSubsequence("abcde", "ace")); // Expected Output: 3
// console.log(longestCommonSubsequence("abc", "abc"));   // Expected Output: 3
// console.log(longestCommonSubsequence("abc", "def"));   // Expected Output: 0
