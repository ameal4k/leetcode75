import { Info } from "../types"; // Adjust path based on your project structure

// ─────────────────────────────────────────────────────────────
// Metadata for your indexer / dashboards
// ─────────────────────────────────────────────────────────────
export const info: Info = {
  problemNumber: 605,
  problem: "Can Place Flowers",
  source: "LeetCode",
  difficulty: "Easy",
  timeComplexity: "O(n)", // One pass from left → right (sometimes skipping ahead by 2).
  spaceComplexity: "O(1)", // No extra structures; we optionally mutate the input array.
  constraints: {
    arrayLength: "1 <= flowerbed.length <= 2 * 10^4",
    values: "flowerbed[i] is 0 or 1.",
    plantingLimit: "0 <= n <= flowerbed.length",
    initialState: "The flowerbed has no adjacent flowers initially."
  },
  exampleInput: [[1,0,0,0,1], 1],
  expectedOutput: true,
  runtime: 0,
  runtimePercentile: 100,
  memory: 57.67,
  memoryPercentile: 39.08,
  note: "Greedy scan; plant at i when neighbors are empty; skip i+1."
};

// ─────────────────────────────────────────────────────────────
// Core idea:
//   We walk the array with index i. At each empty slot (0), we check its
//   left and right neighbors. If BOTH are empty (or out of bounds),
//   we "plant" here (set to 1), increment count, and SKIP the next slot
//   because adjacency is forbidden. If not plantable, just move to i+1.
//   Early exit when count >= n.
// ─────────────────────────────────────────────────────────────
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  // Tracks how many new flowers we've successfully planted so far.
  let count = 0;

  // Our scanning pointer.
  let i = 0;

  // Cache length for clarity and micro-efficiency.
  const length = flowerbed.length;

  // Optional micro-optimization: if n is 0, we're already done.
  // (Leaving it out wouldn't break correctness; it just saves time.)
  if (n === 0) return true;

  // Main scan loop: continue while i is in-bounds.
  while (i < length) {
    // We only *try* to plant when the current slot is empty.
    // If it's already 1, there's a flower here and also the next spot is blocked,
    // so we just move on.
    if (flowerbed[i] === 0) {
      // Determine whether the *left* neighbor is "empty enough".
      // - At the very left edge (i === 0), there's no neighbor, which we treat as safe/empty.
      // - Otherwise, we require flowerbed[i - 1] === 0.
      const leftEmpty = (i === 0 || flowerbed[i - 1] === 0);

      // Determine whether the *right* neighbor is "empty enough".
      // - At the very right edge (i === length - 1), there's no neighbor, also safe/empty.
      // - Otherwise, we require flowerbed[i + 1] === 0.
      const rightEmpty = (i === length - 1 || flowerbed[i + 1] === 0);

      // If both sides are empty (or edges), we can plant here.
      if (leftEmpty && rightEmpty) {
        // Plant: mark this slot as occupied so downstream checks see the updated state.
        flowerbed[i] = 1;

        // Count this placement.
        count++;

        // If we've planted at least n, we can answer immediately.
        if (count >= n) return true;

        // Critical step: skip the next slot because adjacency is forbidden.
        // After planting at i, i+1 cannot be used, so we jump directly to i+2.
        i += 2;

        // Using `continue` here clarifies: we're done with this iteration,
        // don't run the fallback `i++` below.
        continue;
      }
    }

    // If we couldn't (or didn't need to) plant at i, just move to the next slot.
    i++;
  }

  // If we finished scanning without hitting the early exit, we still might have
  // planted enough along the way. Return whether we met or exceeded n.
  return count >= n;
}

// ─────────────────────────────────────────────────────────────
// Example Test Cases
// ─────────────────────────────────────────────────────────────
console.log(canPlaceFlowers([1,0,0,0,1], 1)); // true  — plant at index 2
console.log(canPlaceFlowers([1,0,0,0,1], 2)); // false — only one slot (2) is valid
console.log(canPlaceFlowers([0,0,1,0,0], 1)); // true  — plant at 0 or 4
console.log(canPlaceFlowers([1,0,1,0,1,0,1], 0)); // true  — need to plant 0 flowers
console.log(canPlaceFlowers([0], 1)); // true  — single slot; edges count as empty
console.log(canPlaceFlowers([0,0,0,0,0], 3)); // true  — plant at 0,2,4
console.log(canPlaceFlowers([0,0,1,0,0,0,1,0,0], 2)); // true — e.g., plant at 1 and 4

/* ─────────────────────────────────────────────────────────────
   Notes / Mental model:
   - "Edges are safe": no neighbor = empty neighbor → enabled by (i === 0 || ...) style.
   - "Greedy is optimal": planting at the first valid spot never reduces total capacity,
     because it only blocks i+1, which would have been blocked by any placement anyway.
   - "Skip after planting": i += 2 avoids re-checking a forbidden adjacent cell.
   - "Early exit": once count >= n, no need to keep scanning.

   If you prefer *no* `continue`, the exact logic can be expressed as:

   function canPlaceFlowersNoContinue(flowerbed: number[], n: number): boolean {
     let count = 0;
     for (let i = 0; i < flowerbed.length; ) {
       if (
         flowerbed[i] === 0 &&
         (i === 0 || flowerbed[i - 1] === 0) &&
         (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)
       ) {
         flowerbed[i] = 1;
         count++;
         if (count >= n) return true;
         i += 2; // skip adjacent
       } else {
         i += 1; // just move on
       }
     }
     return count >= n;
   }
*/
