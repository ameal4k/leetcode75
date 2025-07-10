import { Info } from "../types";

export const info: Info = {
  problemNumber: 1268,
  problem: "Search Suggestions System",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n log n + m log n)",   // n = products.length, m = searchWord.length
  spaceComplexity: "O(n)",                // for sorting and storing products
  constraints: {
    numberOfProducts: "1 <= products.length <= 1000",
    productLengths: "1 <= products[i].length <= 3000",
    totalLength:   "sum(products[i].length) <= 2·10⁴",
    unique:        "all products[i] are unique lowercase strings",
    searchLength:  "1 <= searchWord.length <= 1000"
  },
  exampleInput: {
    products: ["mobile","mouse","moneypot","monitor","mousepad"],
    searchWord: "mouse"
  },
  expectedOutput: [
    ["mobile","moneypot","monitor"],
    ["mobile","moneypot","monitor"],
    ["mouse","mousepad"],
    ["mouse","mousepad"],
    ["mouse","mousepad"]
  ],
  // Fill these in after your LeetCode run:
  runtime:         14,
  runtimePercentile: 89.63,
  memory:           67.86,
  memoryPercentile: 91.85,
  note: [
    "First sort products lexicographically.",
    "For each growing prefix, binary-search the first match and take up to 3 suggestions."
  ].join(" ")
};

/**
 * Returns up to three lexicographically-minimal products
 * that begin with each prefix of searchWord.
 */
function suggestedProducts(products: string[], searchWord: string): string[][] {
  products.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  const result: string[][] = [];
  let prefix = "";
  const n = products.length;
  const baseArr = products; // alias

  for (const ch of searchWord) {
    prefix += ch;
    // binary search for the first index where product >= prefix
    let lo = 0, hi = n - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      if (baseArr[mid] < prefix) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    // collect up to three matches
    const suggestions: string[] = [];
    for (let i = lo; i < n && i < lo + 3; i++) {
      if (baseArr[i].startsWith(prefix)) {
        suggestions.push(baseArr[i]);
      } else {
        break;
      }
    }
    result.push(suggestions);
  }

  return result;
}

// 🔥 Example Test
console.log(
  suggestedProducts(
    ["mobile","mouse","moneypot","monitor","mousepad"],
    "mouse"
  )
);
// Expected:
// [
//   ["mobile","moneypot","monitor"],
//   ["mobile","moneypot","monitor"],
//   ["mouse","mousepad"],
//   ["mouse","mousepad"],
//   ["mouse","mousepad"]
// ]
