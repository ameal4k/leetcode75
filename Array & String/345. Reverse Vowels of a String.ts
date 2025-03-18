import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 345,
    problem: "Reverse Vowels of a String",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Two-pointer traversal ensures linear time complexity.
    spaceComplexity: "O(n)", // Uses an array for mutable string operations.
    constraints: {
        stringLength: "1 <= s.length <= 3 * 10^5",
        characters: "s consists of printable ASCII characters."
    },
    exampleInput: "IceCreAm",
    expectedOutput: "AceCreIm",
    runtime: 2, // Execution time in milliseconds (to be filled manually)
    runtimePercentile: 98.9, // Percentile ranking for runtime performance
    memory: 61.69, // Memory usage in MB (to be filled manually)
    memoryPercentile: 38.77, // Percentile ranking for memory efficiency
};

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
