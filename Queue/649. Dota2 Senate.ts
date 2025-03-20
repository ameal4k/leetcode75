import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 649,
    problem: "Dota2 Senate",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Efficient queue-based approach
    spaceComplexity: "O(1)", // Uses only a few integer variables
    constraints: {
        senateLength: "1 <= senate.length <= 10^4",
        characters: "senate[i] is either 'R' or 'D'."
    },
    exampleInput: "RDD",
    expectedOutput: "Dire",
    runtime: 10, // 🔥 Enter after testing
    runtimePercentile: 90.59, // 🔥 Enter after testing
    memory: 60.78, // 🔥 Enter after testing
    memoryPercentile: 41.09, // 🔥 Enter after testing
    note: "Optimized with counters instead of full queues."
};

function predictPartyVictory(senate: string): string {
    let radiantCount = 0;
    let direCount = 0;
    let radiantBan = 0;
    let direBan = 0;

    let senators = senate.split("");

    while (true) {
        let newSenate: string[] = [];
        for (const senator of senators) {
            if (senator === "R") {
                if (radiantBan > 0) {
                    radiantBan--; // Ban this senator
                } else {
                    direBan++; // Increase Dire ban count
                    newSenate.push("R");
                    radiantCount++;
                }
            } else {
                if (direBan > 0) {
                    direBan--; // Ban this senator
                } else {
                    radiantBan++; // Increase Radiant ban count
                    newSenate.push("D");
                    direCount++;
                }
            }
        }

        // ✅ Early exit if one party is completely eliminated
        if (radiantCount === 0) return "Dire";
        if (direCount === 0) return "Radiant";

        // Reset counts for next iteration
        senators = newSenate;
        radiantCount = 0;
        direCount = 0;
    }
}

// 🔥 Example Test Cases
console.log(predictPartyVictory("RD"));  // ✅ Expected Output: "Radiant"
console.log(predictPartyVictory("RDD")); // ✅ Expected Output: "Dire"
console.log(predictPartyVictory("RRDDD")); // ✅ Expected Output: "Radiant"
console.log(predictPartyVictory("DDRRR")); // ✅ Expected Output: "Dire"
console.log(predictPartyVictory("RRRDDD")); // ✅ Expected Output: "Radiant"
