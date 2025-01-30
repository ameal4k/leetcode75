/**
 * Function to merge two strings by alternating characters from each string.
 * If one string is longer, the remaining characters are appended at the end.
 * 
 * The approach iterates through both strings up to the length of the longer one,
 * alternating characters and appending any leftover characters at the end.
 * 
 * Complexity:
 * - Time: O(n) where n = max(word1.length, word2.length)
 * - Space: O(n) due to storing the merged result in an array before joining.
 */

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
