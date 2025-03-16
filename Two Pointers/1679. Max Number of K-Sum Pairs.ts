import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 1679,
    problem: "Max Number of K-Sum Pairs",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Single pass using a hash map for lookups
    spaceComplexity: "O(n)", // Hash map stores at most n unique elements
    constraints: {
        arrayLength: "1 <= nums.length <= 10^5",
        elementRange: "1 <= nums[i] <= 10^9",
        kRange: "1 <= k <= 10^9"
    },
    exampleInput: "nums = [3,1,3,4,3], k = 6",
    expectedOutput: "1",
    note: "Uses a hash map to track complements, ensuring an efficient O(n) solution."
};

function maxOperations(nums: number[], k: number): number {
    let count = 0; // ✅ Number of valid k-sum pairs
    const freqMap = new Map<number, number>(); // ✅ Hash map to store occurrences of numbers

    for (let num of nums) {
        let complement = k - num; // ✅ Required pair value

        // ✅ Check if the complement exists in the hash map
        if (freqMap.get(complement) ?? 0 > 0) {
            count++; // ✅ Found a valid pair
            freqMap.set(complement, freqMap.get(complement)! - 1); // ✅ Decrease complement count
        } else {
            // ✅ Store the current number in the hash map
            freqMap.set(num, (freqMap.get(num) ?? 0) + 1);
        }
    }

    return count;
}

// 🔥 Example Test Cases
console.log(maxOperations([1, 2, 3, 4], 5)); // ✅ Expected Output: 2
console.log(maxOperations([3, 1, 3, 4, 3], 6)); // ✅ Expected Output: 1
console.log(maxOperations([2, 2, 2, 2, 2], 4)); // ✅ Expected Output: 2
console.log(maxOperations([1, 5, 1, 5, 1, 5], 6)); // ✅ Expected Output: 3
