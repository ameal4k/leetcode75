import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 334,
    problem: "Increasing Triplet Subsequence",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // The algorithm iterates through the array once.
    spaceComplexity: "O(1)", // Only two variables (`small` and `medium`) are used.
    constraints: {
        arrayLength: "1 <= nums.length <= 5 * 10^5",
        elementRange: "-2^31 <= nums[i] <= 2^31 - 1"
    },
    exampleInput: [1, 2, 3, 4, 5],
    expectedOutput: true,
    note: "The problem statement does NOT require the triplet to be contiguous. Many users find this misleading, but as long as the indices satisfy i < j < k, and nums[i] < nums[j] < nums[k], the triplet is valid.",
    runtime: 0, // Execution time in milliseconds (to be updated)
    runtimePercentile: 100, // Percentile ranking for runtime performance
    memory: 77.02, // Memory usage in MB (to be updated)
    memoryPercentile: 21.84, // Percentile ranking for memory efficiency
};

function increasingTriplet(nums: number[]): boolean {
    let small: number = Number.MAX_SAFE_INTEGER;
    let medium: number = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i]; // ✅ Cache lookup for performance
        if (num <= small) {
            small = num;  // ✅ Update `small` if a new smallest is found
        } else if (num <= medium) {
            medium = num; // ✅ Update `medium` if a new second smallest is found
        } else {
            return true;  // ✅ Found a triplet: small < medium < nums[i]
        }
    }

    return false;
}

// 🔥 Example Test Cases
console.log(increasingTriplet([1, 2, 3, 4, 5])); // ✅ true
console.log(increasingTriplet([5, 4, 3, 2, 1])); // ✅ false
console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); // ✅ true
console.log(increasingTriplet([20, 100, 10, 12, 5, 13])); // ✅ true
console.log(increasingTriplet([10, 9, 8, 7, 6, 5])); // ✅ false
console.log(increasingTriplet([3, 3, 3, 3, 5])); // ✅ false
console.log(increasingTriplet([3, 3, 3, 3, 5, 6])); // ✅ true
