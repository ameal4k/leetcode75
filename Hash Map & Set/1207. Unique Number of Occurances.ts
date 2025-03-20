import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1207,
    problem: "Unique Number of Occurrences",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Single pass to count and validate uniqueness
    spaceComplexity: "O(n)", // Uses Map and Set to store counts and validate uniqueness
    constraints: {
        arrayLength: "1 <= arr.length <= 1000",
        elementRange: "-1000 <= arr[i] <= 1000"
    },
    exampleInput: [1,2,2,1,1,3],
    expectedOutput: true,
    runtime: 0, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance (to be updated manually)
    memory: 56.71, // Memory usage in MB (to be updated manually)
    memoryPercentile: 31.81, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Uses hash maps to count occurrences and a set to check uniqueness.",
};

function uniqueOccurrences(arr: number[]): boolean {
    const countMap = new Map<number, number>();

    // ✅ Step 1: Count occurrences of each number
    for (const num of arr) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }

    const occurrences = new Set<number>();

    // ✅ Step 2: Ensure all counts are unique
    for (const count of countMap.values()) {
        if (occurrences.has(count)) return false;
        occurrences.add(count);
    }

    return true;
}

// 🔥 Example Test Cases
console.log(uniqueOccurrences([1,2,2,1,1,3])); // ✅ Expected Output: true
console.log(uniqueOccurrences([1,2])); // ✅ Expected Output: false
console.log(uniqueOccurrences([-3,0,1,-3,1,1,1,-3,10,0])); // ✅ Expected Output: true
console.log(uniqueOccurrences([5, 5, 5, 5])); // ✅ Expected Output: false
console.log(uniqueOccurrences([7, 8, 9, 10, 7, 8, 9, 10])); // ✅ Expected Output: true
