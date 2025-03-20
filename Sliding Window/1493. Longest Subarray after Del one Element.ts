import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1493,
    problem: "Longest Subarray of 1's After Deleting One Element",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Efficient sliding window, single pass.
    spaceComplexity: "O(1)", // Only a few variables are used.
    constraints: {
        arrayLength: "1 <= nums.length <= 10^5",
        values: "nums[i] is either 0 or 1"
    },
    exampleInput: [1, 1, 0, 1],
    expectedOutput: 3,
    runtime: 1, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 91.79, // Percentile ranking for runtime performance (to be updated manually)
    memory: 63.34, // Memory usage in MB (to be updated manually)
    memoryPercentile: 45.23, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Optimized sliding window approach for maximum efficiency."
};

function longestSubarray(nums: number[]): number {
    let left = 0, maxLen = 0, zeroCount = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeroCount++; // ✅ Track number of zeros

        while (zeroCount > 1) {
            if (nums[left] === 0) zeroCount--; // ✅ Shrink window from the left
            left++;
        }

        maxLen = Math.max(maxLen, right - left); // ✅ Track max length (excluding one zero)
    }

    return maxLen;
}

// 🔥 Example Test Cases
console.log(longestSubarray([1, 1, 0, 1])); // ✅ Expected Output: 3
console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])); // ✅ Expected Output: 5
console.log(longestSubarray([1, 1, 1])); // ✅ Expected Output: 2 (must delete one element)
console.log(longestSubarray([0, 0, 0])); // ✅ Expected Output: 0
console.log(longestSubarray([1, 0, 1, 0, 1, 0, 1])); // ✅ Expected Output: 2
