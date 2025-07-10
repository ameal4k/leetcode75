import { Info } from "../types";

export const info: Info = {
  problemNumber: 714,
  problem: "Best Time to Buy and Sell Stock with Transaction Fee",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n)",    // One pass through prices
  spaceComplexity: "O(1)",   // Only two variables used
  constraints: {
    priceLength: "1 <= prices.length <= 5 * 10^4",
    priceRange: "1 <= prices[i] < 5 * 10^4",
    feeRange: "0 <= fee < 5 * 10^4"
  },
  exampleInput: `prices = [1,3,2,8,4,9], fee = 2`,
  expectedOutput: "8",
  runtime:           1,  // e.g.  44 ms
  runtimePercentile: 100,  // e.g. 85.00%
  memory:            62.61,  // e.g. 50.3 MB
  memoryPercentile:  90.28,  // e.g. 70.00%
  note: "Maintain two states: cash (no stock) and hold (holding stock), update in one pass."
};

/**
 * Uses a simple state machine:
 * - cash: max profit so far without holding a share
 * - hold: max profit so far holding a share
 *
 * On each day:
 *   newHold = max(hold, cash - price)
 *   newCash = max(cash, hold + price - fee)
 *
 * Return cash at end (we'll have sold any holding for max profit).
 */
export function maxProfit(prices: number[], fee: number): number {
  let cash = 0;               // profit without holding a share
  let hold = -prices[0];      // profit when holding one (bought at day 0)

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    // Either keep holding, or buy today (spend price)
    hold = Math.max(hold, cash - price);
    // Either keep cash, or sell today (gain price minus fee)
    cash = Math.max(cash, hold + price - fee);
  }

  return cash;
}

// 🔥 Example Test Cases
// console.log(maxProfit([1,3,2,8,4,9], 2)); // Expected Output: 8
// console.log(maxProfit([1,3,7,5,10,3], 3)); // Expected Output: 6
