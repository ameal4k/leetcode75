import { Info } from '../types' // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 151,
    problem: "Reverse Words in a String",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Trimming, splitting, reversing, and joining are all linear operations.
    spaceComplexity: "O(n)", // Storing an array of words before recombining.
    constraints: {
        stringLength: "1 <= s.length <= 10^4",
        characters: "s consists of English letters (upper/lower case), digits, and spaces ' '.",
        hasWords: "There is at least one word in s."
    },
    exampleInput: "the sky is blue",
    expectedOutput: "blue is sky the",
};

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
