/**
 * LeetCode Problem: Product of Array Except Self
 * 
 * Given an integer array `nums`, return an array `answer` such that `answer[i]`
 * is equal to the product of all the elements of `nums` except `nums[i]`.
 *
 * Constraints:
 * - 2 <= nums.length <= 10^5
 * - -30 <= nums[i] <= 30
 * - The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
 * - The solution must run in O(n) time and cannot use division.
 *
 * Time Complexity: O(n) - Efficient single pass updating prefix & suffix.
 * Space Complexity: O(1) - Uses the result array for in-place modification.
 */

function productExceptSelf(nums: number[]): number[] {
    // Variable for input length
    const n = nums.length;
    
    // Create an array of n length with each index initialized to 1
    const result: number[] = new Array(n).fill(1);

    let left = 1, right = 1;

    for (let i = 0; i < n; i++) {
        // Moving from the left forward (prefix product)
        result[i] *= left;
        left *= nums[i];

        // Moving from the right backward (suffix product)
        result[n - 1 - i] *= right;
        right *= nums[n - 1 - i];
    }

    return result;
}

// 🔥 Example Test Cases
console.log(productExceptSelf([1, 2, 3, 4])); // Expected Output: [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // Expected Output: [0, 0, 9, 0, 0]
console.log(productExceptSelf([2, 3, 4, 5])); // Expected Output: [60, 40, 30, 24]
