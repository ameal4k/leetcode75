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
    expectedOutput: "AB"
};

/**
 * 🔹 Iterative Approach (Using a While Loop)
 * - Uses an **iterative GCD function** to find the greatest common divisor.
 * - **More memory-efficient** (O(1) space, avoids function call overhead).
 */
function iterative(str1: string, str2: string): string {
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

/**
 * 🔹 Recursive Approach (Using Function Calls)
 * - Uses a **recursive GCD function** to find the greatest common divisor.
 * - **Less efficient** due to function call overhead (O(log n) recursion depth).
 */
function recursive(str1: string, str2: string): string {
    // Step 1: Ensure str1 and str2 can share a common divisor pattern
    if (str1 + str2 !== str2 + str1) {
        return ""; // If concatenations are different, no common divisor exists
    }

    // Step 2: Recursive function to compute GCD
    function gcd(a: number, b: number): number {
        return b === 0 ? a : gcd(b, a % b); // Recursively call gcd until b = 0
    }

    // Step 3: Extract substring up to the GCD length
    const gcdLength = gcd(str1.length, str2.length);
    return str1.substring(0, gcdLength);
}

// 🔥 Example Usage & Testing
console.log(iterative("ABABAB", "ABAB")); // Expected Output: "AB"
console.log(recursive("ABABAB", "ABAB")); // Expected Output: "AB"

console.log(iterative("ABCABC", "ABC")); // Expected Output: "ABC"
console.log(recursive("ABCABC", "ABC")); // Expected Output: "ABC"

console.log(iterative("LEET", "CODE")); // Expected Output: ""
console.log(recursive("LEET", "CODE")); // Expected Output: ""
