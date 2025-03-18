import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 605,
    problem: "Can Place Flowers",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Single pass, optimized loop skipping unnecessary checks.
    spaceComplexity: "O(1)", // Modifies input array in-place with no extra space.
    constraints: {
        arrayLength: "1 <= flowerbed.length <= 2 * 10^4",
        values: "flowerbed[i] is 0 or 1.",
        plantingLimit: "0 <= n <= flowerbed.length",
        initialState: "The flowerbed has no adjacent flowers initially."
    },
    exampleInput: [[1,0,0,0,1], 1],
    expectedOutput: true,
    runtime: 0, // Execution time in milliseconds (to be filled manually)
    runtimePercentile: 100, // Percentile ranking for runtime performance
    memory: 57.67, // Memory usage in MB (to be filled manually)
    memoryPercentile: 39.08, // Percentile ranking for memory efficiency
    note: "Further optimized loop with reduced condition checks."
};

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    let count = 0;
    let i = 0;
    const length = flowerbed.length;

    while (i < length) {
        if (flowerbed[i] === 0) {
            const leftEmpty = (i === 0 || flowerbed[i - 1] === 0);
            const rightEmpty = (i === length - 1 || flowerbed[i + 1] === 0);

            if (leftEmpty && rightEmpty) {
                flowerbed[i] = 1; // ✅ Plant flower
                count++; // ✅ Increase planted count
                if (count >= n) return true; // ✅ Early exit

                i += 2; // ✅ Skip next spot (adjacent planting is not allowed)
                continue; // ✅ Move to next check immediately
            }
        }
        i++; // ✅ Move to the next position
    }

    return count >= n;
}

// 🔥 Example Test Cases
console.log(canPlaceFlowers([1,0,0,0,1], 1)); // ✅ Expected Output: true
console.log(canPlaceFlowers([1,0,0,0,1], 2)); // ✅ Expected Output: false
console.log(canPlaceFlowers([0,0,1,0,0], 1)); // ✅ Expected Output: true
console.log(canPlaceFlowers([1,0,1,0,1,0,1], 0)); // ✅ Expected Output: true
console.log(canPlaceFlowers([0], 1)); // ✅ Expected Output: true
console.log(canPlaceFlowers([0,0,0,0,0], 3)); // ✅ Expected Output: true
console.log(canPlaceFlowers([0,0,1,0,0,0,1,0,0], 2)); // ✅ Expected Output: true
