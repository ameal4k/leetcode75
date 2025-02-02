/**
 * LeetCode Problem: Increasing Triplet Subsequence
 * 
 * Given an integer array `nums`, return true if there exists a triplet (i, j, k)
 * such that i < j < k and nums[i] < nums[j] < nums[k]. Otherwise, return false.
 * 
 * The solution must run in O(n) time and use O(1) extra space.
 * 
 * Constraints:
 * - 1 <= nums.length <= 5 * 10^5
 * - -2^31 <= nums[i] <= 2^31 - 1
 * 
 * Time Complexity: O(n) - The algorithm iterates through the array once.
 * Space Complexity: O(1) - Only two variables (`small` and `medium`) are used.
 * 
 * Note: The problem statement does NOT require the triplet to be contiguous.
 * Many users find this misleading, but as long as the indices satisfy i < j < k,
 * and nums[i] < nums[j] < nums[k], the triplet is valid.
 */

function increasingTriplet(nums: number[]): boolean {
    let small: number = Infinity; // Tracks the smallest value found so far
    let medium: number = Infinity; // Tracks the second smallest value found so far

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] <= small) {
            small = nums[i];  // ✅ Update the smallest number
        } else if (nums[i] <= medium) {
            medium = nums[i]; // ✅ Update the second smallest number
        } else {
            return true;      // ✅ Found a triplet: small < medium < nums[i]
        }
    }
    return false;
}

// 🔥 Example Test Cases
console.log(increasingTriplet([1, 2, 3, 4, 5])); // ✅ true
console.log(increasingTriplet([5, 4, 3, 2, 1])); // ✅ false
console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); // ✅ true
console.log(increasingTriplet([20, 100, 10, 12, 5, 13])); // ✅ true
console.log(increasingTriplet([10, 9, 8, 7, 6, 5])); // ✅ false
console.log(increasingTriplet([3, 3, 3, 3, 5])); // ✅ false
console.log(increasingTriplet([3, 3, 3, 3, 5, 6])); // ✅ true
