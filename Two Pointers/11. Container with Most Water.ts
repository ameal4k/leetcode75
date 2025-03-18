import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 11,
    problem: "Container With Most Water",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // The two-pointer approach traverses the array once.
    spaceComplexity: "O(1)", // Only a few extra variables are used.
    constraints: {
        arrayLength: "2 <= height.length <= 10^5",
        heightRange: "0 <= height[i] <= 10^4"
    },
    exampleInput: "height = [1,8,6,2,5,4,8,3,7]",
    expectedOutput: "49",
    runtime: 1, // Execution time in milliseconds
    runtimePercentile: 94.22, // Percentile ranking for runtime performance
    memory: 63.92, // Memory usage in MB
    memoryPercentile: 42.02, // Percentile ranking for memory efficiency
    note: "Optimized two-pointer technique with early exits for better performance."
};

function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        // Store the smaller height (instead of calling Math.min)
        const minHeight = height[left] < height[right] ? height[left] : height[right];
        const width = right - left;
        const currentArea = width * minHeight;

        // Inline manual comparison instead of Math.max
        if (currentArea > maxWater) {
            maxWater = currentArea;
        }

        // Move the pointer with the smaller height, and **skip** smaller values
        if (height[left] < height[right]) {
            const oldLeft = height[left];
            while (left < right && height[left] <= oldLeft) left++; // Skip short heights
        } else {
            const oldRight = height[right];
            while (left < right && height[right] <= oldRight) right--; // Skip short heights
        }
    }

    return maxWater;
}

// 🔥 Example Test Cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // ✅ Expected Output: 49
console.log(maxArea([1,1])); // ✅ Expected Output: 1
console.log(maxArea([4,3,2,1,4])); // ✅ Expected Output: 16
console.log(maxArea([1,2,1])); // ✅ Expected Output: 2
console.log(maxArea([2,3,10,5,7,8,9])); // ✅ Expected Output: 36
