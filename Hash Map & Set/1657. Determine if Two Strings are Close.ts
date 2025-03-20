import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1657,
    problem: "Determine if Two Strings Are Close",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n log n)", // Sorting frequency counts dominates
    spaceComplexity: "O(1)", // Fixed space for at most 26 letters
    constraints: {
        stringLength: "1 <= word1.length, word2.length <= 10^5",
        characters: "word1 and word2 contain only lowercase English letters."
    },
    exampleInput: ["cabbba", "abbccc"],
    expectedOutput: true,
    runtime: 20, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 94.35, // Percentile ranking for runtime performance (to be updated manually)
    memory: 64.41, // Memory usage in MB (to be updated manually)
    memoryPercentile: 37.16, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Uses character frequency counting and sorting to validate transformations.",
};

function closeStrings(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) return false; // ✅ Different lengths → impossible

    const freq1 = new Array(26).fill(0);
    const freq2 = new Array(26).fill(0);

    for (let char of word1) freq1[char.charCodeAt(0) - 97]++;
    for (let char of word2) freq2[char.charCodeAt(0) - 97]++;

    // ✅ Step 1: Check if the same unique characters exist
    for (let i = 0; i < 26; i++) {
        if ((freq1[i] === 0) !== (freq2[i] === 0)) return false;
    }

    // ✅ Step 2: Check if the sorted frequency counts match
    freq1.sort((a, b) => a - b);
    freq2.sort((a, b) => a - b);

    return freq1.every((val, i) => val === freq2[i]);
}

// 🔥 Example Test Cases
console.log(closeStrings("abc", "bca")); // ✅ Expected Output: true
console.log(closeStrings("a", "aa")); // ✅ Expected Output: false
console.log(closeStrings("cabbba", "abbccc")); // ✅ Expected Output: true
console.log(closeStrings("abbzzca", "babzzcz")); // ✅ Expected Output: false
