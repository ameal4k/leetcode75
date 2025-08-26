import { Info } from '../types' // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 151,
    problem: "Reverse Words in a String",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Trimming, splitting, reversing, and joining are all linear operations.
    spaceComplexity: "O(n)", // Uses an array for words but avoids extra overhead.
    constraints: {
        stringLength: "1 <= s.length <= 10^4",
        characters: "s consists of English letters (upper/lower case), digits, and spaces ' '.",
        hasWords: "There is at least one word in s."
    },
    exampleInput: "the sky is blue",
    expectedOutput: "blue is sky the",
    runtime: 0, // Execution time in milliseconds (to be filled manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance
    memory: 57.66, // Memory usage in MB (to be filled manually)
    memoryPercentile: 28.01, // Percentile ranking for memory efficiency
    note: "Reverted to best-performing solution using optimized regex split.",
    learned: true
};

function reverseWords(s: string): string {
    return s.trim().split(/\s+/).reverse().join(" ");
}

// 🔥 Example Test Cases
console.log(reverseWords("the sky is blue")); // ✅ Expected Output: "blue is sky the"
console.log(reverseWords("  hello world  ")); // ✅ Expected Output: "world hello"
console.log(reverseWords("a good   example")); // ✅ Expected Output: "example good a"
console.log(reverseWords("  this   is  a test  ")); // ✅ Expected Output: "test a is this"

