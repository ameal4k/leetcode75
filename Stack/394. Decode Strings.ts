import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 394,
    problem: "Decode String",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Each character is processed once using a stack.
    spaceComplexity: "O(n)", // Stack stores substrings & multipliers.
    constraints: {
        stringLength: "1 <= s.length <= 30",
        characters: "s consists of lowercase English letters, digits, and square brackets '[]'.",
        digitRange: "All integers in s are in the range [1, 300]."
    },
    exampleInput: "3[a2[c]]",
    expectedOutput: "accaccacc",
    runtime: 0, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance (to be updated manually)
    memory: 54.88, // Memory usage in MB (to be updated manually)
    memoryPercentile: 43.12, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Optimized stack-based decoding with efficient parsing of nested brackets.",
};

function decodeString(s: string): string {
    const numStack: number[] = [];  // Stack to store repeat counts
    const strStack: string[] = [];  // Stack to store substrings
    let currentStr = "";            // Stores current substring
    let currentNum = 0;             // Tracks current number multiplier

    for (let char of s) {
        if (!isNaN(Number(char))) {
            currentNum = currentNum * 10 + Number(char);  // ✅ Handle multi-digit numbers
        } else if (char === "[") {
            numStack.push(currentNum);  // ✅ Store repetition count
            strStack.push(currentStr);  // ✅ Store current string
            currentStr = "";  // Reset for new segment
            currentNum = 0;   // Reset number
        } else if (char === "]") {
            let repeatCount = numStack.pop()!;  // ✅ Get repeat count
            let decodedPart = currentStr.repeat(repeatCount); // ✅ Expand substring
            currentStr = strStack.pop()! + decodedPart; // ✅ Append expanded string
        } else {
            currentStr += char; // ✅ Build the current substring
        }
    }

    return currentStr;
}

// 🔥 Example Test Cases
console.log(decodeString("3[a]2[bc]")); // ✅ Expected Output: "aaabcbc"
console.log(decodeString("3[a2[c]]")); // ✅ Expected Output: "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // ✅ Expected Output: "abcabccdcdcdef"
console.log(decodeString("10[a]")); // ✅ Expected Output: "aaaaaaaaaa"
