import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1431,
    problem: "Kids With the Greatest Number of Candies",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Finding max is O(n), and mapping is O(n), so overall O(n).
    spaceComplexity: "O(n)", // We return a new boolean array of the same size as `candies`.
    constraints: {
        arrayLength: "2 <= candies.length <= 100",
        valueRange: "1 <= candies[i] <= 100",
        extraCandiesRange: "1 <= extraCandies <= 50"
    },
    exampleInput: [[2,3,5,1,3], 3],
    expectedOutput: [true, true, true, false, true],
    runtime: 0, // Execution time in milliseconds (to be filled manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance
    memory: 56.26, // Memory usage in MB (to be filled manually)
    memoryPercentile: 37.89, // Percentile ranking for memory efficiency
};

function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    // Step 1: Find the largest candy count without extras
    let largestCount = Math.max(...candies);

    // Step 2: Compare each kid's total candies (after extraCandies) to largestCount
    return candies.map(kid => (kid + extraCandies >= largestCount));
}

// 🔥 Example Test Cases
console.log(kidsWithCandies([2,3,5,1,3], 3)); // Expected Output: [true, true, true, false, true]
console.log(kidsWithCandies([4,2,1,1,2], 1)); // Expected Output: [true, false, false, false, false]
console.log(kidsWithCandies([12,1,12], 10)); // Expected Output: [true, false, true]
