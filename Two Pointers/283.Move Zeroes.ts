/**
 * LeetCode Problem: Move Zeroes
 * 
 * Given an integer array `nums`, move all 0's to the end of it while maintaining
 * the relative order of the non-zero elements.
 * 
 * The function modifies the input array in-place and does not return anything.
 *
 * Example Input: [0,1,0,3,12]
 * Expected Output: [1,3,12,0,0]
 *
 * Constraints:
 * - 1 <= nums.length <= 10^4
 * - -2^31 <= nums[i] <= 2^31 - 1
 *
 * Time Complexity: O(n) - Each element is processed once.
 * Space Complexity: O(1) - Modifies the input array without extra space.
 */

function moveZeroes(nums: number[]): void {
    let write = 0; // Pointer to track where to write non-zero values

    // Step 1: Move non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        // If pointer is at a non-zero value
        if (nums[i] !== 0) {
            // Overwrite with non-zero value
            nums[write] = nums[i]; 
            write++; // Move the write pointer forward
        }
    }

    // Step 2: Fill remaining positions with zeroes
    while (write < nums.length) {
        // Fill up the remaining slots with zeroes
        nums[write] = 0;
        write++;
    }
}

// 🔥 Example Test Cases
let nums1 = [0,1,0,3,12];
moveZeroes(nums1);
console.log(nums1); // Expected Output: [1,3,12,0,0]

let nums2 = [0,0,1];
moveZeroes(nums2);
console.log(nums2); // Expected Output: [1,0,0]

let nums3 = [2,1];
moveZeroes(nums3);
console.log(nums3); // Expected Output: [2,1]
