import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1768,
    problem: "Merge Strings Alternately",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Iterates through both strings up to the longest one.
    spaceComplexity: "O(n)", // Stores the merged result in an array before joining.
    constraints: {
        stringLength: "1 <= word1.length, word2.length <= 100",
        characters: "word1 and word2 consist of lowercase English letters."
    },
    exampleInput: ["abc", "pqr"],
    expectedOutput: "apbqcr"
};

function mergeAlternately(word1: string, word2: string): string {
    let combo: string[] = []; // ✅ Use an array for efficient concatenation

    // Loop through the longest word's length
    for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
        if (i < word1.length) {
            combo.push(word1[i]); // ✅ Append character from word1
        }
        if (i < word2.length) {
            combo.push(word2[i]); // ✅ Append character from word2
        }
    }

    return combo.join(""); // ✅ Convert array to string efficiently
}

// 🔥 Example Usage & Testing
console.log(mergeAlternately("abc", "pqr"));    // Expected Output: "apbqcr"
console.log(mergeAlternately("ab", "pqrs"));   // Expected Output: "apbqrs"
console.log(mergeAlternately("abcd", "pq"));   // Expected Output: "apbqcd"
