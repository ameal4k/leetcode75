/**
 * LeetCode Problem: Reverse Words in a String
 * 
 * Given an input string `s`, reverse the order of the words and return the result.
 * A word is defined as a sequence of non-space characters. Words in `s` will be 
 * separated by at least one space.
 * 
 * The returned string should have a single space between words and no extra spaces.
 *
 * Constraints:
 * - 1 <= s.length <= 10^4
 * - s consists of English letters (upper/lower case), digits, and spaces ' '.
 * - There is at least one word in `s`.
 * 
 * Time Complexity: O(n) - Trimming, splitting, reversing, and joining are all linear operations.
 * Space Complexity: O(n) - Storing an array of words before recombining.
 */

function reverseWords(s: string): string {
    // trim() to remove spaces at start and end, '/ and /' mark the beginning of the regular expression, \s is any whitespace character, and + selects any amount of them
    const wordsArray: string[] = s.trim().split(/\s+/);
    return wordsArray.reverse().join(" ");
}

// 🔥 Example Test Cases
console.log(reverseWords("the sky is blue")); // Expected Output: "blue is sky the"
console.log(reverseWords("  hello world  ")); // Expected Output: "world hello"
console.log(reverseWords("a good   example")); // Expected Output: "example good a"
console.log(reverseWords("  this   is  a test  ")); // Expected Output: "test a is this"
