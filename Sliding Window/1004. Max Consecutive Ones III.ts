import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1004,
    problem: "Max Consecutive Ones III",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Sliding window processes each element once
    spaceComplexity: "O(1)", // Only uses constant extra space
    constraints: {
        arrayLength: "1 <= nums.length <= 10^5",
        elementValues: "nums[i] is either 0 or 1",
        flipLimit: "0 <= k <= nums.length"
    },
    exampleInput: [[1,1,1,0,0,0,1,1,1,1,0], 2],
    expectedOutput: 6,
    runtime: 1, // Execution time in milliseconds
    runtimePercentile: 97.52, // Percentile ranking for runtime performance
    memory: 61.35, // Memory usage in MB
    memoryPercentile: 38.53, // Percentile ranking for memory efficiency
    note: "Further optimized sliding window approach with reduced checks."
};

function longestOnes(nums: number[], k: number): number {
    let left = 0;
    let right = 0;
    let zeroCount = 0;

    for (; right < nums.length; right++) {
        zeroCount += nums[right] ^ 1; // ✅ Bitwise trick (0 → 1 count, 1 → 0 count)

        if (zeroCount > k) {
            zeroCount -= nums[left] ^ 1; // ✅ Adjust zeroCount as left pointer moves
            left++;
        }
    }

    return right - left;
}

// 🔥 Example Test Cases
console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // ✅ Expected Output: 6
console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)); // ✅ Expected Output: 10
console.log(longestOnes([1,0,1,1,0,1,1,1,1,1], 2)); // ✅ Expected Output: 10
console.log(longestOnes([0,0,0,0], 2)); // ✅ Expected Output: 2
console.log(longestOnes([1,1,1,1], 1)); // ✅ Expected Output: 4
