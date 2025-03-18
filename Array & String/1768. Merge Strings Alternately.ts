import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1768,
    problem: "Merge Strings Alternately",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Iterates through both strings up to the longest one.
    spaceComplexity: "O(n)", // Uses an array before joining, which is unavoidable.
    constraints: {
        stringLength: "1 <= word1.length, word2.length <= 100",
        characters: "word1 and word2 consist of lowercase English letters."
    },
    exampleInput: ["abc", "pqr"],
    expectedOutput: "apbqcr",
    runtime: 43, // Execution time in milliseconds (to be filled manually)
    runtimePercentile: 91.31, // Percentile ranking for runtime performance
    memory: 55.64, // Memory usage in MB (to be filled manually)
    memoryPercentile: 34.73, // Percentile ranking for memory efficiency
};

function mergeAlternately(word1: string, word2: string): string {
    const merged: string[] = new Array(word1.length + word2.length); // ✅ Pre-allocated array for efficiency
    let index = 0, i = 0, j = 0;

    while (i < word1.length && j < word2.length) {
        merged[index++] = word1[i++];
        merged[index++] = word2[j++];
    }

    // ✅ Append remaining characters using slice instead of loop
    while (i < word1.length) merged[index++] = word1[i++];
    while (j < word2.length) merged[index++] = word2[j++];

    return merged.join(""); // ✅ Join once at the end for efficiency
}

// 🔥 Example Usage & Testing
console.log(mergeAlternately("abc", "pqr"));    // ✅ Expected Output: "apbqcr"
console.log(mergeAlternately("ab", "pqrs"));   // ✅ Expected Output: "apbqrs"
console.log(mergeAlternately("abcd", "pq"));   // ✅ Expected Output: "apbqcd"
console.log(mergeAlternately("a", "bcd"));     // ✅ Expected Output: "abcd"
console.log(mergeAlternately("abcd", "e"));    // ✅ Expected Output: "aebcd"
