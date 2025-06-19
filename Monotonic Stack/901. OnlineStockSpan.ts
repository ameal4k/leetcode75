import { Info } from "../types";

export const info: Info = {
  problemNumber: 901,
  problem: "Online Stock Span",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "Amortized O(1) per call",   // each price is pushed/popped at most once
  spaceComplexity: "O(n)",                     // stores up to n entries
  constraints: {
    calls:      "At most 10⁴ calls to next()",
    priceRange: "1 <= price <= 10⁵"
  },
  exampleInput: "['StockSpanner','next','next','next','next','next','next','next'], [[],[100],[80],[60],[70],[60],[75],[85]]",
  expectedOutput: "[null,1,1,1,2,1,4,6]",
  runtime:           48,       // ms
  runtimePercentile: 63.35,    // %
  memory:            70.29,    // MB
  memoryPercentile:  81.45,     // %
  note: "Manual monotonic stack using Int32Array pointers; reached JS performance ceiling—further gains require a compiled-language rewrite."
};

export class StockSpanner {
  private prices = new Int32Array(10000);
  private spans  = new Int32Array(10000);
  private top    = 0;

  next(price: number): number {
    let span = 1;
    let t = this.top;
    const P = this.prices;
    const S = this.spans;

    // collapse all previous days ≤ today's price
    while (t > 0 && P[t - 1] <= price) {
      span += S[t - 1];
      t--;
    }

    // record today
    P[t] = price;
    S[t] = span;
    this.top = t + 1;

    return span;
  }
}

// 🔥 Example Usage
// const sp = new StockSpanner();
// console.log(sp.next(100)); // 1
// console.log(sp.next(80));  // 1
// console.log(sp.next(60));  // 1
// console.log(sp.next(70));  // 2
// console.log(sp.next(60));  // 1
// console.log(sp.next(75));  // 4
// console.log(sp.next(85));  // 6
