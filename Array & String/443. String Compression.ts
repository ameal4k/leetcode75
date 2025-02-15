import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 443,
    problem: "String Compression",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Each character is visited only once.
    spaceComplexity: "O(1)", // Modifies the input array without extra space.
    constraints: {
        description: "Given an array of characters, compress it in-place by replacing consecutive repeating characters with the character followed by the count of occurrences.",
        restriction: "The compressed result must fit within the input array, and the function returns the new length of the array after compression."
    },
    exampleInput: ["a","a","b","b","c","c","c"],
    expectedOutput: 6
};

function compress(chars: string[]): number {
    let write = 0; // Position to write compressed data
    let i = 0;     // Position to read characters

    while (i < chars.length) {
        let char = chars[i];  // Store the current character
        let count = 0;        // Counter to track how many times it appears consecutively

        // Count consecutive occurrences of the character
        while (i < chars.length && chars[i] === char) {
            count++; // Increment count for consecutive character
            i++;     // Move read pointer forward
        }

        // Write the character to the array at the write pointer
        chars[write] = char;
        write++;

        // If the count is greater than 1, write the count as separate digits
        if (count > 1) {
            let countStr = count.toString(); // Convert count to string
            for (let digit of countStr) {   // Write each digit separately
                chars[write] = digit;
                write++;
            }
        }
    }

    return write; // Return the new length of the modified array
}

// 🔥 Example Test Case
let example = ["a","a","b","b","c","c","c"];
console.log(compress(example)); // Expected Output: 6, modifies example to ["a","2","b","2","c","3"]
