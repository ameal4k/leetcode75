import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1071,
    problem: "Greatest Common Divisor of Strings",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Iterative GCD function ensures efficient computation.
    spaceComplexity: "O(1) for iterative, O(log n) for recursive", // Iterative approach avoids function call overhead.
    constraints: {
        stringLength: "1 <= str1.length, str2.length <= 1000",
        characters: "str1 and str2 consist of uppercase English letters."
    },
    note: "Uses the Euclidean algorithm to find the greatest common divisor of string lengths.",
    exampleInput: ["ABABAB", "ABAB"],
    expectedOutput: "AB",
    runtime: 0, // Execution time in milliseconds (to be filled manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance
    memory: 58.09, // Memory usage in MB (to be filled manually)
    memoryPercentile: 14.43, // Percentile ranking for memory efficiency
};

/**
 * 🔹 Iterative Approach (Using a While Loop)
 * - Uses an **iterative GCD function** to find the greatest common divisor.
 * - **More memory-efficient** (O(1) space, avoids function call overhead).
 */
function gcdOfStrings(str1: string, str2: string): string {
    // Step 1: Ensure str1 and str2 can share a common divisor pattern
    if (str1 + str2 !== str2 + str1) {
        return ""; // If concatenations are different, no common divisor exists
    }

    // Step 2: Find the GCD of the string lengths using an iterative approach
    const gcd = (len1: number, len2: number): number => {
        while (len2 !== 0) {
            [len1, len2] = [len2, len1 % len2]; // Swap values and compute remainder
        }
        return len1;
    };

    // Step 3: Extract substring up to the GCD length
    return str1.slice(0, gcd(str1.length, str2.length));
}


// 🔥 Example Usage & Testing
console.log(gcdOfStrings("ABABAB", "ABAB")); // Expected Output: "AB"


console.log(gcdOfStrings("ABCABC", "ABC")); // Expected Output: "ABC"


console.log(gcdOfStrings("LEET", "CODE")); // Expected Output: ""

