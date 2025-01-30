/**
 * Function to determine which kids can have the greatest number of candies
 * after receiving `extraCandies`. Returns a boolean array indicating whether
 * each kid's new candy count would be at least as high as the current maximum.
 *
 * Time Complexity: O(n) - We find the max value in O(n), and map over the array in O(n),
 * so the overall complexity remains O(n).
 * 
 * Space Complexity: O(n) - We return a new boolean array of the same size as `candies`.
 */

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
