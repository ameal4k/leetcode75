import { Info } from "../types";

export const info: Info = {
  problemNumber: 17,
  problem: "Letter Combinations of a Phone Number",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(4ⁿ · n)",   // up to 4 letters per digit, building strings of length n
  spaceComplexity: "O(4ⁿ · n)",  // holds all combinations
  constraints: {
    length: "0 <= digits.length <= 4",
    digits: "digits[i] is in the range ['2', '9']"
  },
  exampleInput: `digits = "23"`,
  expectedOutput: `["ad","ae","af","bd","be","bf","cd","ce","cf"]`,
  runtime:           0,  // e.g. 0 ms
  runtimePercentile: 100,  // e.g. 100.00%
  memory:            55.11,  // e.g. 39.5 MB
  memoryPercentile:  66.13,  // e.g. 95.00%
  note: "Iterative BFS-style expansion avoids recursion overhead."
};

/**
 * Given a string of digits from 2–9, return all possible letter combinations.
 */
export function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];

  // Mapping from digit to its letters.
  const map: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs','8': 'tuv', '9': 'wxyz'
  };

  // Start with an empty prefix
  let combinations: string[] = [''];

  for (const digit of digits) {
    const letters = map[digit];
    const next: string[] = [];
    // Expand each existing combination by each letter
    for (const prefix of combinations) {
      for (const ch of letters) {
        next.push(prefix + ch);
      }
    }
    combinations = next;
  }

  return combinations;
}

// 🔥 Example Tests
// console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// console.log(letterCombinations(""));   // []
// console.log(letterCombinations("2"));  // ["a","b","c"]
