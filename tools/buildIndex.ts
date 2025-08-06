import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { Info } from '../types';

const SOLUTIONS_DIR = path.join(__dirname, '../');

async function main() {
  const files = await fg(['**/*.ts'], {
    cwd: SOLUTIONS_DIR,
    ignore: ['node_modules/**', 'tools/**', 'types.ts'],
    absolute: true,
  });

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

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const match = content.match(/export\s+const\s+info\s*:\s*Info\s*=\s*(\{[\s\S]*?\n\});?/);
    if (!match) continue;

    const infoCode = match[1];
    try {
      const func = new Function(`return ${infoCode}`);
      const info = func() as Info;
      info.path = path.relative(SOLUTIONS_DIR, file);
      const target = info.learned ? learned : unlearned;

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

  const difficultyLevels: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"];

  const allInfos = [...difficultyLevels.flatMap(d => [...learned[d], ...unlearned[d]])];

  // Metric 1: Progress by difficulty
  const learnedTotal = difficultyLevels.reduce((sum, level) => sum + learned[level].length, 0);
  const unlearnedTotal = difficultyLevels.reduce((sum, level) => sum + unlearned[level].length, 0);
  const total = learnedTotal + unlearnedTotal;

  // Metric 2: Average runtime and memory usage
  const runtimeValues = allInfos.map(i => i.runtime).filter(Boolean) as number[];
  const avgRuntime = runtimeValues.length > 0 ? Number((runtimeValues.reduce((a, b) => a + b, 0) / runtimeValues.length).toFixed(2)) : null;

  const memoryValues = allInfos.map(i => i.memory).filter(Boolean) as number[];
  const avgMemory = memoryValues.length > 0 ? Number((memoryValues.reduce((a, b) => a + b, 0) / memoryValues.length).toFixed(2)) : null;

  // Metric 4: Time/space complexity patterns
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

  // Metric 5: Runtime and memory percentile stats
  const runtimePercentiles = allInfos.map(i => i.runtimePercentile).filter(Boolean) as number[];
  const memoryPercentiles = allInfos.map(i => i.memoryPercentile).filter(Boolean) as number[];
  const avgRuntimePercentile = runtimePercentiles.length > 0 ? Number((runtimePercentiles.reduce((a, b) => a + b, 0) / runtimePercentiles.length).toFixed(2)) : null;
  const avgMemoryPercentile = memoryPercentiles.length > 0 ? Number((memoryPercentiles.reduce((a, b) => a + b, 0) / memoryPercentiles.length).toFixed(2)) : null;

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

  const result = {
    progress,
    learned: Object.fromEntries(difficultyLevels.map((d) => [d, learned[d]]).filter(([_, arr]) => arr.length > 0)),
    unlearned: Object.fromEntries(difficultyLevels.map((d) => [d, unlearned[d]]).filter(([_, arr]) => arr.length > 0)),
  };

  fs.writeFileSync(
    path.join(SOLUTIONS_DIR, 'leetcodeIndex.json'),
    JSON.stringify(result, null, 2)
  );

  console.log('✅ LeetCode index successfully generated!');
}

main();