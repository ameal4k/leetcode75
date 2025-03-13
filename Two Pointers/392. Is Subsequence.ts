import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 392,
    problem: "Is Subsequence",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Linear time using two pointers
    spaceComplexity: "O(1)", // Constant space complexity
    constraints: {
        stringLengthS: "0 <= s.length <= 100",
        stringLengthT: "0 <= t.length <= 10^4",
        characters: "s and t consist only of lowercase English letters."
    },
    exampleInput: "s = 'abc', t = 'ahbgdc'",
    expectedOutput: "true",
    note: "Optimized two-pointer approach with early exits."
};

function isSubsequence(s: string, t: string): boolean {
    if (s.length === 0) return true;  // ✅ An empty string is always a subsequence
    if (s.length > t.length) return false;  // ✅ If s is longer than t, it's impossible

    let sIndex = 0;
    
    // ✅ Using a for-loop for optimized traversal
    for (let tIndex = 0; tIndex < t.length && sIndex < s.length; tIndex++) {
        if (s[sIndex] === t[tIndex]) {
            sIndex++; // ✅ Move forward in s if we find a match in t
        }
    }

    return sIndex === s.length;
}

// 🔥 Example Test Cases
console.log(isSubsequence("abc", "ahbgdc")); // ✅ Expected Output: true
console.log(isSubsequence("axc", "ahbgdc")); // ✅ Expected Output: false
console.log(isSubsequence("", "ahbgdc"));    // ✅ Expected Output: true (empty string case)
console.log(isSubsequence("b", "abc"));      // ✅ Expected Output: true
console.log(isSubsequence("acb", "ahbgdc")); // ✅ Expected Output: false (order matters)