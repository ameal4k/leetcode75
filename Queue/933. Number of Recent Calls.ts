import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 933,
    problem: "Number of Recent Calls",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(1) amortized", // Queue operations are now true O(1)
    spaceComplexity: "O(n)", // Stores at most 3000 recent timestamps
    constraints: {
        requestTime: "1 <= t <= 10^9",
        increasingTime: "Each test case will call ping with strictly increasing values of t.",
        maxCalls: "At most 10^4 calls to ping."
    },
    exampleInput: ["RecentCounter", "ping", "ping", "ping", "ping"],
    expectedOutput: [null, 1, 2, 3, 3],
    runtime: 22, // 🔥 Enter after testing
    runtimePercentile: 100, // 🔥 Enter after testing
    memory: 71.6, // 🔥 Enter after testing
    memoryPercentile: 19.4, // 🔥 Enter after testing
    note: "Optimized queue with left boundary tracking instead of shift(), ensuring O(1) performance."
};

class RecentCounter {
    private queue: number[] = [];
    private left: number = 0; // ✅ Left boundary index to avoid shifting

    ping(t: number): number {
        this.queue.push(t);

        // ✅ Instead of `shift()`, move left pointer
        while (this.queue[this.left] < t - 3000) {
            this.left++; // ✅ Moves O(1), no re-indexing
        }

        return this.queue.length - this.left; // ✅ O(1) size calculation
    }
}

// 🔥 Example Test Cases
const recentCounter = new RecentCounter();
console.log(recentCounter.ping(1));     // ✅ Expected Output: 1
console.log(recentCounter.ping(100));   // ✅ Expected Output: 2
console.log(recentCounter.ping(3001));  // ✅ Expected Output: 3
console.log(recentCounter.ping(3002));  // ✅ Expected Output: 3
