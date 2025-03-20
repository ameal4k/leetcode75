import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 724,
    problem: "Find Pivot Index",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Single pass after computing total sum
    spaceComplexity: "O(1)", // Only uses two extra variables for tracking sums
    constraints: {
        arrayLength: "1 <= nums.length <= 10^4",
        elementRange: "-1000 <= nums[i] <= 1000"
    },
    exampleInput: [1,7,3,6,5,6],
    expectedOutput: 3,
    runtime: 0, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance (to be updated manually)
    memory: 58.07, // Memory usage in MB (to be updated manually)
    memoryPercentile: 47.63, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Final optimized O(n) solution with minimal computation inside the loop."
};

function pivotIndex(nums: number[]): number {
    let totalSum = nums.reduce((sum, num) => sum + num, 0); // ✅ Compute total sum in O(n)
    let leftSum = 0;

    for (let i = 0; i < nums.length; i++) {
        // ✅ Avoids recomputation of right sum using subtraction
        if (leftSum === totalSum - leftSum - nums[i]) return i;
        leftSum += nums[i]; // ✅ Efficient in-place update
    }

    return -1; // ❌ No pivot index found
}

// 🔥 Example Test Cases
console.log(pivotIndex([1,7,3,6,5,6])); // ✅ Expected Output: 3
console.log(pivotIndex([1,2,3])); // ✅ Expected Output: -1
console.log(pivotIndex([2,1,-1])); // ✅ Expected Output: 0
console.log(pivotIndex([0,0,0,0])); // ✅ Expected Output: 0
console.log(pivotIndex([-1,-1,-1,-1,-1,-1,0])); // ✅ Expected Output: 6
