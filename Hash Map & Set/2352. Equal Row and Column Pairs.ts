import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 2352,
    problem: "Equal Row and Column Pairs",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n^2)", // Each row and column is processed in O(n)
    spaceComplexity: "O(n^2)", // Storing rows in a hashmap
    constraints: {
        matrixSize: "1 <= n <= 200",
        elementRange: "1 <= grid[i][j] <= 10^5"
    },
    exampleInput: [[[3,2,1],[1,7,6],[2,7,7]]],
    expectedOutput: 1,
    runtime: 26, // Execution time in milliseconds (to be updated manually)
    runtimePercentile: 94.09, // Percentile ranking for runtime performance (to be updated manually)
    memory: 64.85, // Memory usage in MB (to be updated manually)
    memoryPercentile: 45.82, // Percentile ranking for memory efficiency (to be updated manually)
    note: "Optimized hashmap lookup with JSON.stringify for faster key comparisons.",
};

function equalPairs(grid: number[][]): number {
    const n = grid.length;
    const rowMap = new Map<string, number>();
    let count = 0;

    // ✅ Step 1: Store row representations in a hashmap
    for (let row of grid) {
        const key = JSON.stringify(row);
        rowMap.set(key, (rowMap.get(key) || 0) + 1);
    }

    // ✅ Step 2: Check column representations against the hashmap
    for (let col = 0; col < n; col++) {
        let colArray: number[] = new Array(n);
        for (let row = 0; row < n; row++) {
            colArray[row] = grid[row][col]; // ✅ Constructing column dynamically
        }
        const key = JSON.stringify(colArray);
        if (rowMap.has(key)) {
            count += rowMap.get(key)!;
        }
    }

    return count;
}

// 🔥 Example Test Cases
console.log(equalPairs([[3,2,1],[1,7,6],[2,7,7]])); // ✅ Expected Output: 1
console.log(equalPairs([[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]])); // ✅ Expected Output: 3
console.log(equalPairs([[1,2],[2,1]])); // ✅ Expected Output: 0
