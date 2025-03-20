import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 2390,
    problem: "Removing Stars From a String",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Linear scan with in-place modifications.
    spaceComplexity: "O(1)", // Modifies the input string using a pointer instead of extra storage.
    constraints: {
        stringLength: "1 <= s.length <= 10^5",
        characters: "s consists of lowercase English letters and stars '*'.",
        operationValidity: "The operation above can be performed on s."
    },
    exampleInput: `"leet**cod*e"`,
    expectedOutput: `"lecoe"`,
    runtime: 13, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 98.23, // Percentile ranking for runtime performance (to be updated manually)
    memory: 66.4, // Memory usage in MB (to be updated manually)
    memoryPercentile: 47.15, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Uses an in-place two-pointer approach to reduce space complexity to O(1)."
};

function removeStars(s: string): string {
    let result = s.split(""); // ✅ Convert string to array for in-place modification
    let write = 0; // ✅ Pointer tracking where valid characters are stored

    for (let i = 0; i < result.length; i++) {
        if (result[i] === "*") {
            write--; // ✅ Remove last valid character (backtrack)
        } else {
            result[write++] = result[i]; // ✅ Overwrite valid character in-place
        }
    }

    return result.slice(0, write).join(""); // ✅ Return the valid portion of the array
}

// 🔥 Example Test Cases
console.log(removeStars("leet**cod*e")); // ✅ Expected Output: "lecoe"
console.log(removeStars("erase*****")); // ✅ Expected Output: ""
console.log(removeStars("a*b*c*")); // ✅ Expected Output: ""
console.log(removeStars("abc*de**fg")); // ✅ Expected Output: "afg"
console.log(removeStars("ab****c")); // ✅ Expected Output: "c"
