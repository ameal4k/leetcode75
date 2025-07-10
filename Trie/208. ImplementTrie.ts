import { Info } from "../types";

export const info: Info = {
  problemNumber: 208,
  problem: "Implement Trie (Prefix Tree)",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(m)",        // m = length of the word/prefix
  spaceComplexity: "O(N·σ)",     // N = total nodes, σ=alphabet size but lazy
  constraints: {
    wordLength: "1 <= word.length, prefix.length <= 2000",
    calls: "≤ 3·10⁴ calls to insert/search/startsWith",
    alphabet: "lowercase English only"
  },
  exampleInput: {
    operations: ["Trie","insert","search","search","startsWith","insert","search"],
    arguments: [   [],   ["apple"], ["apple"], ["app"],   ["app"],   ["app"],   ["app"]   ]
  },
  expectedOutput: [null,null,true,false,true,null,true],
  runtime: 40,            // Updated runtime (ms)
  runtimePercentile: 77.90, 
  memory: 80.37,          // Updated memory (MB)
  memoryPercentile: 37.14,

  note: [
    "Children arrays are allocated lazily to avoid paying σ=26 everywhere.",
    "Numeric‐index lookups into a small typed array beat string‐keyed maps.",
    "Further JS micro-optimizations (e.g. arena-allocating nodes) might eke out a bit more,",
    "but 90%+ in pure JS is extremely challenging due to engine overhead."
  ].join(" "),
};

class TrieNode {
  public children: (TrieNode | null)[] | null = null;
  public isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  /** Inserts a word into the trie. */
  public insert(word: string): void {
    let node = this.root;
    for (let i = 0, L = word.length; i < L; i++) {
      const c = word.charCodeAt(i) - 97;
      if (node.children === null) {
        node.children = Array(26).fill(null);
      }
      let nxt = node.children[c];
      if (!nxt) {
        nxt = new TrieNode();
        node.children[c] = nxt;
      }
      node = nxt;
    }
    node.isEnd = true;
  }

  /** Returns true if the word is in the trie. */
  public search(word: string): boolean {
    let node: TrieNode | null = this.root;
    for (let i = 0, L = word.length; node && i < L; i++) {
      node = node.children?.[word.charCodeAt(i) - 97] ?? null;
    }
    return !!node && node.isEnd;
  }

  /** Returns true if any word in the trie starts with the given prefix. */
  public startsWith(prefix: string): boolean {
    let node: TrieNode | null = this.root;
    for (let i = 0, L = prefix.length; node && i < L; i++) {
      node = node.children?.[prefix.charCodeAt(i) - 97] ?? null;
    }
    return !!node;
  }
}
