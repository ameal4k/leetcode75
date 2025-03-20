import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 735,
    problem: "Asteroid Collision",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Each asteroid is processed once using a stack.
    spaceComplexity: "O(n)", // Stack stores surviving asteroids.
    constraints: {
        arrayLength: "2 <= asteroids.length <= 10^4",
        values: "-1000 <= asteroids[i] <= 1000",
        nonZero: "asteroids[i] != 0"
    },
    exampleInput: [5, 10, -5],
    expectedOutput: [5, 10],
    runtime: 2, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 92.21, // Percentile ranking for runtime performance (to be updated manually)
    memory: 58.4, // Memory usage in MB (to be updated manually)
    memoryPercentile: 46.27, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Stack-based collision resolution ensuring efficient asteroid processing.",
};

function asteroidCollision(asteroids: number[]): number[] {
    const stack: number[] = [];

    for (let asteroid of asteroids) {
        let destroyed = false;

        while (stack.length > 0 && asteroid < 0 && stack[stack.length - 1] > 0) {
            let top = stack[stack.length - 1];

            if (Math.abs(asteroid) > top) {
                stack.pop(); // ✅ Smaller asteroid is destroyed
                continue;
            } else if (Math.abs(asteroid) === top) {
                stack.pop(); // ✅ Both asteroids destroy each other
            }

            destroyed = true; // ✅ Incoming asteroid is destroyed
            break;
        }

        if (!destroyed) {
            stack.push(asteroid); // ✅ Surviving asteroid is added
        }
    }

    return stack;
}

// 🔥 Example Test Cases
console.log(asteroidCollision([5, 10, -5])); // ✅ Expected Output: [5, 10]
console.log(asteroidCollision([8, -8])); // ✅ Expected Output: []
console.log(asteroidCollision([10, 2, -5])); // ✅ Expected Output: [10]
console.log(asteroidCollision([-2, -1, 1, 2])); // ✅ Expected Output: [-2, -1, 1, 2]
