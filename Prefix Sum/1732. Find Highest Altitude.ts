import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1732,
    problem: "Find the Highest Altitude",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Iterates through the array once.
    spaceComplexity: "O(1)", // Uses only two variables for tracking altitude.
    constraints: {
        arrayLength: "1 <= n <= 100",
        elementRange: "-100 <= gain[i] <= 100"
    },
    exampleInput: [-5,1,5,0,-7],
    expectedOutput: 1,
    runtime: 0, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance (to be updated manually)
    memory: 55.53, // Memory usage in MB (to be updated manually)
    memoryPercentile: 36.6, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Optimized O(n) solution using a single loop to track max altitude."
};

function largestAltitude(gain: number[]): number {
    let maxAltitude = 0, currentAltitude = 0;

    for (const change of gain) {
        currentAltitude += change; // ✅ Update altitude based on net gain/loss
        if (currentAltitude > maxAltitude) {
            maxAltitude = currentAltitude; // ✅ Track the highest altitude reached
        }
    }

    return maxAltitude;
}

// 🔥 Example Test Cases
console.log(largestAltitude([-5,1,5,0,-7])); // ✅ Expected Output: 1
console.log(largestAltitude([-4,-3,-2,-1,4,3,2])); // ✅ Expected Output: 0
console.log(largestAltitude([1,2,3,4])); // ✅ Expected Output: 10
console.log(largestAltitude([-1,-2,-3,-4])); // ✅ Expected Output: 0
console.log(largestAltitude([0,0,0,0])); // ✅ Expected Output: 0
