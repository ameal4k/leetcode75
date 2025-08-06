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
      const target = info.learned ? learned : unlearned;

      // Group the file by its difficulty (Easy/Medium/Hard)
      if (target[info.difficulty]) {
        target[info.difficulty].push(info);
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
  const runtimeValues = allInfos.map(i => i.runtime).filter(Boolean) as number[];
  const avgRuntime = runtimeValues.length > 0
    ? Number((runtimeValues.reduce((a, b) => a + b, 0) / runtimeValues.length).toFixed(2))
    : null;

  // Metric 3: Average memory
  const memoryValues = allInfos.map(i => i.memory).filter(Boolean) as number[];
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
  const runtimePercentiles = allInfos.map(i => i.runtimePercentile).filter(Boolean) as number[];
  const memoryPercentiles = allInfos.map(i => i.memoryPercentile).filter(Boolean) as number[];

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
    percentComplete: Number(((learnedTotal / total) * 100).toFixed(2)),
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
      difficultyLevels.map((d) => [d, learned[d]]).filter(([_, arr]) => arr.length > 0)
    ),
    unlearned: Object.fromEntries(
      difficultyLevels.map((d) => [d, unlearned[d]]).filter(([_, arr]) => arr.length > 0)
    ),
  };

  // Step 9: Write the final output to leetcodeIndex.json
  fs.writeFileSync(
    path.join(SOLUTIONS_DIR, 'leetcodeIndex.json'),
    JSON.stringify(result, null, 2)
  );

  console.log('✅ LeetCode index successfully generated!');
}

// Run the script
main();
