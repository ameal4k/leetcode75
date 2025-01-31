/**
 * LeetCode Problem: Reverse Vowels of a String
 * 
 * Given a string `s`, reverse only all the vowels in the string and return it.
 * The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both
 * lower and upper cases, more than once.
 * 
 * Constraints:
 * - 1 <= s.length <= 3 * 10^5
 * - s consists of printable ASCII characters.
 * 
 * Time Complexity: O(n) - Two-pointer traversal ensures linear time complexity.
 * Space Complexity: O(n) - Uses an array for mutable string operations.
 */

function reverseVowels(s: string): string {
    // Use a Set for vowels which allows O(1) lookups with has(), faster than includes()
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    
    // Convert input string into an array for in-place modifications
    let arr = s.split('');
    
    // Initialize two-pointer positions at the left and right extremes of the array
    let left = 0;
    let right = arr.length - 1;

    // Run loop until pointers meet in the middle
    while (left < right) {
        // Move left pointer forward if it's not a vowel
        while (left < right && !vowels.has(arr[left])) {
            left++;
        }
        
        // Move right pointer backward if it's not a vowel
        while (left < right && !vowels.has(arr[right])) {
            right--;
        }

        // Swap vowels
        [arr[left], arr[right]] = [arr[right], arr[left]];

        // Move pointers toward the middle
        left++;
        right--;
    }

    // Convert the array back to a string and return it
    return arr.join('');
}

// 🔥 Example Test Cases
console.log(reverseVowels("IceCreAm")); // Expected Output: "AceCreIm"
console.log(reverseVowels("leetcode")); // Expected Output: "leotcede"
console.log(reverseVowels("hello"));    // Expected Output: "holle"
console.log(reverseVowels("aA"));       // Expected Output: "Aa"
