import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1456,
    problem: "Maximum Number of Vowels in a Substring of Given Length",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Sliding window processes each character once
    spaceComplexity: "O(1)", // Constant space usage
    constraints: {
        stringLength: "1 <= s.length <= 10^5",
        characters: "s consists of lowercase English letters.",
        kLength: "1 <= k <= s.length"
    },
    exampleInput: "s = 'abciiidef', k = 3",
    expectedOutput: "3",
    runtime: 9, // Execution time in milliseconds
    runtimePercentile: 96.44, // Percentile ranking for runtime performance
    memory: 59.94, // Memory usage in MB
    memoryPercentile: 17.26, // Percentile ranking for memory efficiency
    note: "Highly optimized sliding window with direct array lookup and early exits."
};

function maxVowels(s: string, k: number): number {
    // ✅ Precompute vowel lookups using an ASCII-based boolean array
    const isVowel: boolean[] = new Array(128).fill(false);
    isVowel['a'.charCodeAt(0)] = true;
    isVowel['e'.charCodeAt(0)] = true;
    isVowel['i'.charCodeAt(0)] = true;
    isVowel['o'.charCodeAt(0)] = true;
    isVowel['u'.charCodeAt(0)] = true;

    let maxVowelCount = 0, currentVowelCount = 0;

    // ✅ Compute first window directly inside the loop
    for (let i = 0; i < s.length; i++) {
        if (isVowel[s.charCodeAt(i)]) currentVowelCount++; // ✅ Add vowel
        if (i >= k && isVowel[s.charCodeAt(i - k)]) currentVowelCount--; // ✅ Remove outgoing vowel

        // ✅ Track the max vowel count found
        if (i >= k - 1) {
            if (currentVowelCount > maxVowelCount) {
                maxVowelCount = currentVowelCount;
                if (maxVowelCount === k) return k; // ✅ Early exit when max is reached
            }
        }
    }

    return maxVowelCount;
}

// 🔥 Example Test Cases
console.log(maxVowels("abciiidef", 3)); // ✅ Expected Output: 3
console.log(maxVowels("aeiou", 2)); // ✅ Expected Output: 2
console.log(maxVowels("leetcode", 3)); // ✅ Expected Output: 2
console.log(maxVowels("rhythms", 4)); // ✅ Expected Output: 0
console.log(maxVowels("tryhard", 2)); // ✅ Expected Output: 1
