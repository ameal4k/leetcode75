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

    if (!match) {
      continue; // No `info` block
    }

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

  const result = {
    learned: Object.fromEntries(
      Object.entries(learned).filter(([_, arr]) => arr.length > 0)
    ),
    unlearned: Object.fromEntries(
      Object.entries(unlearned).filter(([_, arr]) => arr.length > 0)
    ),
  };

  fs.writeFileSync(
    path.join(SOLUTIONS_DIR, 'leetcodeIndex.json'),
    JSON.stringify(result, null, 2)
  );

  console.log('✅ LeetCode index successfully generated!');
}

main();
