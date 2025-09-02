# LeetCode & TypeScript Solutions

## Repository Structure

```
.
├─ 0001-two-sum/
│  ├─ solution.ts
│  └─ README.md (optional: per-problem notes)
├─ 0058-length-of-last-word/solution.ts
├─ 1249-min-remove-to-make-valid-parentheses/solution.ts
├─ tools/
│  └─ buildIndex.ts      # ← the script described below
├─ types.ts              # Exports the Info type used by solutions
├─ study_plan.json       # ← local working plan (git-ignored)
├─ leetcodeIndex.json    # ← generated index (git-ignored)
├─ nodemon.json          # ← dev config for auto index building
└─ .gitignore
```

---

## The `Info` Block (per-solution metadata)

Each solution file should export a typed metadata object. This is what the indexer parses.

```ts
// solution.ts
import type { Info } from '../types';

export const info: Info = {
  title: 'Two Sum',
  problemNumber: 1,
  difficulty: 'Easy',
  learned: true,

  runtime: 1.23,
  memory: 35.8,
  runtimePercentile: 92.1,
  memoryPercentile: 88.4,

  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',

  note: 'One-pass hash map (complements).',
};
```

---

## How the Indexer Works

- Scans all `*.ts` solution files (skipping `node_modules/`, `tools/`, and `types.ts`)
- Groups by learned/unlearned and difficulty
- Computes progress metrics (counts, averages, complexities, percentiles)
- Outputs **`leetcodeIndex.json`**
- Reads and updates a user written **`study_plan.json`** (prunes learned problems, fills missing difficulty, adds stats)
