/**
 * LeetCode Problem: Can Place Flowers
 *
 * You have a long flowerbed in which some plots are planted (1) and some are empty (0). 
 * However, flowers cannot be planted in adjacent plots.
 *
 * Given an integer array `flowerbed`, where `0` means empty and `1` means planted,
 * and an integer `n` representing the number of new flowers to be planted,
 * return `true` if `n` new flowers can be planted in the flowerbed without 
 * violating the no-adjacent-flowers rule, otherwise return `false`.
 *
 * Constraints:
 * - 1 <= flowerbed.length <= 2 * 10^4
 * - flowerbed[i] is 0 or 1.
 * - 0 <= n <= flowerbed.length
 * - The flowerbed has no adjacent flowers initially.
 *
 * Time Complexity: O(n) - We iterate through the flowerbed once, skipping indices when planting.
 * Space Complexity: O(1) - We modify no additional data structures.
 */

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    // If no flowers need to be planted, return true immediately
    if (n === 0) return true;

    for (let i = 0; i < flowerbed.length; i++) {
        // Check if the current spot is empty AND both adjacent spots are also empty (or out of bounds)
        if (
            flowerbed[i] === 0 && 
            (i === 0 || flowerbed[i - 1] === 0) && 
            (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)
        ) {
            n--; // Reduce `n` because we found a valid spot
            
            if (n === 0) return true; // Early exit if all flowers are placed

            i++; // Skip the next spot to prevent adjacent planting
        }
    }

    return false; // If loop completes and `n` is still > 0, return false
}

// 🔥 Example Test Cases
console.log(canPlaceFlowers([1,0,0,0,1], 1)); // Expected Output: true
console.log(canPlaceFlowers([1,0,0,0,1], 2)); // Expected Output: false
console.log(canPlaceFlowers([0,0,1,0,0], 1)); // Expected Output: true
console.log(canPlaceFlowers([1,0,1,0,1,0,1], 0)); // Expected Output: true
