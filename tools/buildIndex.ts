// Import necessary Node.js + third-party modules
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { Info } from '../types';

// Define the base directory where your TypeScript LeetCode files are located
const SOLUTIONS_DIR = path.join(__dirname, '../');

async function main() {
  // Step 1: Get all `.ts` solution files in the repo, excluding:
  // - node_modules
  // - the tools directory
  // - the types.ts file
  const files = await fg(['**/*.ts'], {
    cwd: SOLUTIONS_DIR,
    ignore: ['node_modules/**', 'tools/**', 'types.ts'],
    absolute: true,
  });

  // Step 2: Create containers to group problems by whether they've been learned or not
  const learned = {
    Easy: [] as Info[],
    Medium: [] as Info[],
    Hard: [] as Info[],
  };

  const unlearned = {
    Easy: [] as Info[],
    Medium: [] as Info[],
    Hard: [] as Info[],
  };

  // Step 3: Loop through each file and extract its `info` block
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');

    // Look for the export block: `export const info: Info = { ... }`
    const match = content.match(/export\s+const\s+info\s*:\s*Info\s*=\s*(\{[\s\S]*?\n\});?/);
    if (!match) continue; // Skip if no match found

    const infoCode = match[1];
    try {
      // Dynamically evaluate the object literal using a function wrapper
      const func = new Function(`return ${infoCode}`);
      const info = func() as Info;

      // Add the relative file path to the info object
      info.path = path.relative(SOLUTIONS_DIR, file);

      // Decide which container to put this file into (learned or unlearned)
      const target = (info as any).learned ? learned : unlearned;

      // Group the file by its difficulty (Easy/Medium/Hard)
      if (target[info.difficulty as 'Easy' | 'Medium' | 'Hard']) {
        target[info.difficulty as 'Easy' | 'Medium' | 'Hard'].push(info);
      } else {
        console.warn(`❗ Unknown difficulty "${info.difficulty}" in ${file}`);
      }
    } catch (err) {
      console.error(`❌ Failed to parse info in ${file}`);
      console.error(err);
    }
  }

  // Step 4: Define all difficulty levels (used in multiple places)
  const difficultyLevels: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"];

  // Step 5: Gather a flat list of all problems, learned or not
  const allInfos = [...difficultyLevels.flatMap(d => [...learned[d], ...unlearned[d]])];

  // ─────────────────────────────────────────────────────────────
  // Step 6: Generate Progress Metrics
  // ─────────────────────────────────────────────────────────────

  // Metric 1: Total progress by count and by difficulty
  const learnedTotal = difficultyLevels.reduce((sum, level) => sum + learned[level].length, 0);
  const unlearnedTotal = difficultyLevels.reduce((sum, level) => sum + unlearned[level].length, 0);
  const total = learnedTotal + unlearnedTotal;

  // Metric 2: Average runtime
  const runtimeValues = allInfos.map(i => i.runtime).filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));
  const avgRuntime = runtimeValues.length > 0
    ? Number((runtimeValues.reduce((a, b) => a + b, 0) / runtimeValues.length).toFixed(2))
    : null;

  // Metric 3: Average memory
  const memoryValues = allInfos.map(i => i.memory).filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));
  const avgMemory = memoryValues.length > 0
    ? Number((memoryValues.reduce((a, b) => a + b, 0) / memoryValues.length).toFixed(2))
    : null;

  // Metric 4: Count of time/space complexities used across all problems
  const complexityStats = {
    time: {} as Record<string, number>,
    space: {} as Record<string, number>,
  };

  for (const info of allInfos) {
    if (info.timeComplexity) {
      complexityStats.time[info.timeComplexity] = (complexityStats.time[info.timeComplexity] || 0) + 1;
    }
    if (info.spaceComplexity) {
      complexityStats.space[info.spaceComplexity] = (complexityStats.space[info.spaceComplexity] || 0) + 1;
    }
  }

  // Metric 5: Percentile averages (runtime and memory)
  const runtimePercentiles = allInfos.map(i => i.runtimePercentile).filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));
  const memoryPercentiles = allInfos.map(i => i.memoryPercentile).filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));

  const avgRuntimePercentile = runtimePercentiles.length > 0
    ? Number((runtimePercentiles.reduce((a, b) => a + b, 0) / runtimePercentiles.length).toFixed(2))
    : null;

  const avgMemoryPercentile = memoryPercentiles.length > 0
    ? Number((memoryPercentiles.reduce((a, b) => a + b, 0) / memoryPercentiles.length).toFixed(2))
    : null;

  // Step 7: Compile all progress metrics
  const progress = {
    totalCount: total,
    learnedCount: learnedTotal,
    unlearnedCount: unlearnedTotal,
    percentComplete: total > 0 ? Number(((learnedTotal / total) * 100).toFixed(2)) : 0,
    byDifficulty: Object.fromEntries(
      difficultyLevels.map((level) => {
        const total = learned[level].length + unlearned[level].length;
        const learnedCount = learned[level].length;
        const percent = total > 0 ? Number(((learnedCount / total) * 100).toFixed(2)) : 0;
        return [level, { total, learned: learnedCount, percent }];
      })
    ),
    avgRuntime,
    avgMemory,
    avgRuntimePercentile,
    avgMemoryPercentile,
    complexityStats,
  };

  // Step 8: Compile final result object to save
  const result = {
    progress,
    learned: Object.fromEntries(
      difficultyLevels.map((d) => [d, learned[d]]).filter(([_, arr]) => (arr as Info[]).length > 0)
    ),
    unlearned: Object.fromEntries(
      difficultyLevels.map((d) => [d, unlearned[d]]).filter(([_, arr]) => (arr as Info[]).length > 0)
    ),
  };

  // Step 9: Write the final output to leetcodeIndex.json
  fs.writeFileSync(
    path.join(SOLUTIONS_DIR, 'leetcodeIndex.json'),
    JSON.stringify(result, null, 2)
  );

  console.log('✅ LeetCode index successfully generated!');

// ─────────────────────────────────────────────────────────────
// Step 10: Prune learned problems from study_plan.json and add stats
// ─────────────────────────────────────────────────────────────
const studyPlanPath = path.join(SOLUTIONS_DIR, 'study_plan.json');
if (fs.existsSync(studyPlanPath)) {
  try {
    const raw = fs.readFileSync(studyPlanPath, 'utf-8');

    // Accept either legacy array or new object shape
    type PlanItem = { problemNumber: number; title?: string; difficulty?: string; path?: string; };
    type PlanFile =
      | PlanItem[] // legacy
      | { items: PlanItem[]; stats?: any }; // new

    const parsed = JSON.parse(raw) as PlanFile;
    const initialItems: PlanItem[] = Array.isArray(parsed) ? parsed : (parsed.items ?? []);

    // Lookups for learned problems
    const learnedProblemNumbers = new Set<number>(
      difficultyLevels
        .flatMap(d => learned[d].map(i => Number(i.problemNumber)))
        .filter(n => !Number.isNaN(n))
    );
    const learnedPaths = new Set<string>(
      difficultyLevels
        .flatMap(d => learned[d].map(i => i.path || ''))
        .filter(p => p.length > 0)
    );

    // Build a helper map from problemNumber -> difficulty (from your indexed solutions)
    const difficultyByProblemNumber = new Map<number, 'Easy' | 'Medium' | 'Hard'>();
    for (const lvl of difficultyLevels) {
      for (const info of [...learned[lvl], ...unlearned[lvl]]) {
        const n = Number(info.problemNumber);
        if (!Number.isNaN(n)) difficultyByProblemNumber.set(n, lvl);
      }
    }

    const before = initialItems.length;

    // 1) Prune learned by problemNumber OR path
    let filtered = initialItems.filter(item => {
      const isLearnedByNumber = learnedProblemNumbers.has(Number(item.problemNumber));
      const isLearnedByPath = item.path ? learnedPaths.has(item.path) : false;
      return !(isLearnedByNumber || isLearnedByPath);
    });

    // 2) Ensure each remaining item has a difficulty (fill from map if missing)
    filtered = filtered.map(item => {
      if (!item.difficulty) {
        const inferred = difficultyByProblemNumber.get(Number(item.problemNumber));
        if (inferred) return { ...item, difficulty: inferred };
      }
      return item;
    });

    // 3) Build stats
    const counts = { Easy: 0, Medium: 0, Hard: 0, Unknown: 0 };
    for (const it of filtered) {
      const d = (it.difficulty as 'Easy' | 'Medium' | 'Hard' | undefined);
      if (d && counts.hasOwnProperty(d)) counts[d]++;
      else counts.Unknown++;
    }
    const stats = {
      totalRemaining: filtered.length,
      byDifficulty: counts,
      lastUpdated: new Date().toISOString(),
    };

    // 4) Write back in new object shape with stats + items
    const out = { stats, items: filtered };
    fs.writeFileSync(studyPlanPath, JSON.stringify(out, null, 2));

    const removed = before - filtered.length;
    if (removed > 0) {
      console.log(`🧹 Pruned ${removed} learned problem(s) from study_plan.json`);
    } else {
      console.log('🧹 No learned problems to prune from study_plan.json');
    }

    console.log(
      `📊 Study plan stats — total: ${stats.totalRemaining} (E:${counts.Easy}, M:${counts.Medium}, H:${counts.Hard}, U:${counts.Unknown})`
    );

    // OPTIONAL: maintain a legacy array-only file for tools that expect it
    // fs.writeFileSync(
    //   path.join(SOLUTIONS_DIR, 'study_plan.items.json'),
    //   JSON.stringify(filtered, null, 2)
    // );
  } catch (e) {
    console.error('❌ Failed to prune/update study_plan.json:', e);
  }
} else {
  console.log('ℹ️ study_plan.json not found — skipping prune/stats step.');
}

}

// Run the script
main();
