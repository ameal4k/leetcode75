import { Info } from '../types' // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 283,
    problem: "Move Zeroes",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Single pass swap method for optimal efficiency
    spaceComplexity: "O(1)", // Modifies the input array in-place
    constraints: {
        arrayLength: "1 <= nums.length <= 10^4",
        elementRange: "-2^31 <= nums[i] <= 2^31 - 1"
    },
    exampleInput: [0,1,0,3,12],
    expectedOutput: [1,3,12,0,0],
    runtime: 0, // Execution time in milliseconds
    runtimePercentile: 100, // Percentile ranking for runtime performance
    memory: 61.85, // Memory usage in MB
    memoryPercentile: 12.81, // Percentile ranking for memory efficiency
    note: "Optimized two-pointer swap method reduces unnecessary writes."
};

function moveZeroes(nums: number[]): void {
    let write = 0; // Pointer to track position for non-zero elements

    // Step 1: Move non-zero elements forward by swapping instead of overwriting
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            if (i !== write) {
                [nums[write], nums[i]] = [nums[i], nums[write]]; // Swap elements
            }
            write++; // Move the write pointer
        }
    }
}

// 🔥 Example Test Cases
let nums1 = [0,1,0,3,12];
moveZeroes(nums1);
console.log(nums1); // ✅ Expected Output: [1,3,12,0,0]

let nums2 = [0,0,1];
moveZeroes(nums2);
console.log(nums2); // ✅ Expected Output: [1,0,0]

let nums3 = [2,1];
moveZeroes(nums3);
console.log(nums3); // ✅ Expected Output: [2,1]
