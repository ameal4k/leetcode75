import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 643,
    problem: "Maximum Average Subarray I",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Single pass with sliding window
    spaceComplexity: "O(1)", // Only a few extra variables used
    constraints: {
        arrayLength: "1 <= k <= n <= 10^5",
        valuesRange: "-10^4 <= nums[i] <= 10^4"
    },
    exampleInput: "nums = [1,12,-5,-6,50,3], k = 4",
    expectedOutput: "12.75000",
    note: "Sliding window technique maintains a running sum for O(n) efficiency."
};

function findMaxAverage(nums: number[], k: number): number {
    let windowSum = 0;
    
    // Step 1️⃣: Compute the sum of the first `k` elements
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    let maxSum = windowSum;

    // Step 2️⃣: Slide the window across `nums`, updating the sum efficiently
    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k]; // Add new element, remove old
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k; // Compute max average
}

// 🔥 Example Test Cases
console.log(findMaxAverage([1,12,-5,-6,50,3], 4)); // ✅ Expected Output: 12.75000
console.log(findMaxAverage([5], 1));               // ✅ Expected Output: 5.00000
console.log(findMaxAverage([-1, -2, -3, -4], 2));  // ✅ Expected Output: -1.5
