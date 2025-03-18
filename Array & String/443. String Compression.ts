import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 443,
    problem: "String Compression",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Processes each character once
    spaceComplexity: "O(1)", // Modifies the input array in-place
    constraints: {
        description: "Compress the character array in-place by replacing consecutive repeating characters with the character followed by the count of occurrences.",
        restriction: "The compressed result must fit within the input array, and the function returns the new length of the array after compression."
    },
    exampleInput: ["a","a","b","b","c","c","c"],
    expectedOutput: 6, // The first 6 characters should be ["a","2","b","2","c","3"]
    runtime: 1, // Execution time in milliseconds (to be filled manually)
    runtimePercentile: 83.92, // Percentile ranking for runtime performance
    memory: 59, // Memory usage in MB (to be filled manually)
    memoryPercentile: 28.49, // Percentile ranking for memory efficiency
    note: "Manual digit handling and in-place writing for minimal overhead."
};

function compress(chars: string[]): number {
    let write = 0; // ✅ Position to write compressed data
    let i = 0;     // ✅ Position to read characters

    while (i < chars.length) {
        let char = chars[i]; 
        let count = 1; // ✅ Start at 1 since we already counted the first occurrence
        i++;

        // ✅ Count consecutive occurrences
        while (i < chars.length && chars[i] === char) {
            count++;
            i++;
        }

        // ✅ Write character to the array
        chars[write++] = char;

        // ✅ Write count manually (if greater than 1) without conversion functions
        if (count > 1) {
            let countStart = write;
            while (count > 0) {
                chars[write++] = String.fromCharCode((count % 10) + 48); // ✅ Convert number to ASCII char
                count = Math.floor(count / 10);
            }

            // ✅ Reverse the digits (since they were inserted in reverse order)
            let left = countStart, right = write - 1;
            while (left < right) {
                [chars[left], chars[right]] = [chars[right], chars[left]];
                left++;
                right--;
            }
        }
    }

    return write; // ✅ Return the new length of the modified array
}

// 🔥 Example Test Cases
let example1 = ["a","a","b","b","c","c","c"];
console.log(compress(example1)); // ✅ Expected Output: 6 (["a","2","b","2","c","3"])

let example2 = ["a"];
console.log(compress(example2)); // ✅ Expected Output: 1 (["a"])

let example3 = ["a","b","b","b","b","b","b","b","b","b","b","b"];
console.log(compress(example3)); // ✅ Expected Output: 4 (["a","b","1","2"])

let example4 = ["a","a","a","a","a","b","b","c","c","c","c"];
console.log(compress(example4)); // ✅ Expected Output: 7 (["a","5","b","2","c","4"])
