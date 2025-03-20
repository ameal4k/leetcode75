import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 2215,
    problem: "Find the Difference of Two Arrays",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Hash set lookup and array iteration are both linear.
    spaceComplexity: "O(n)", // Uses sets for quick lookups.
    constraints: {
        arrayLength: "1 <= nums1.length, nums2.length <= 1000",
        elementRange: "-1000 <= nums1[i], nums2[i] <= 1000"
    },
    exampleInput: [[1,2,3], [2,4,6]],
    expectedOutput: [[1,3],[4,6]],
    runtime: 6, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 93.39, // Percentile ranking for runtime performance (to be updated manually)
    memory: 62.1, // Memory usage in MB (to be updated manually)
    memoryPercentile: 40.74, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Optimized hash set approach for quick lookups and filtering.",
};

function findDifference(nums1: number[], nums2: number[]): number[][] {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    // ✅ Extract numbers that are in one set but not the other
    const diff1 = Array.from(set1).filter(num => !set2.has(num));
    const diff2 = Array.from(set2).filter(num => !set1.has(num));

    return [diff1, diff2];
}

// 🔥 Example Test Cases
console.log(findDifference([1,2,3], [2,4,6])); // ✅ Expected Output: [[1,3],[4,6]]
console.log(findDifference([1,2,3,3], [1,1,2,2])); // ✅ Expected Output: [[3],[]]
console.log(findDifference([10,20,30], [5,10,20,40])); // ✅ Expected Output: [[30],[5,40]]
console.log(findDifference([], [1,2,3])); // ✅ Expected Output: [[], [1,2,3]]
console.log(findDifference([1,1,1], [1,1,1])); // ✅ Expected Output: [[],[]]
