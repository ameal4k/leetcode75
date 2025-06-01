import { Info } from "../types";

export const info: Info = {
  problemNumber: 994,
  problem: "Rotting Oranges",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(m*n)", // multi‑source BFS traverses every cell once
  spaceComplexity: "O(m*n)", // queue for rotten oranges + grid marking
  constraints: {
    dimensions: "1 <= m, n <= 10",
    cellValues: "grid[i][j] is 0, 1, or 2"
  },
  exampleInput: "[[2,1,1],[1,1,0],[0,1,1]]",
  expectedOutput: 4,
  runtime: 7,
  runtimePercentile: 79.22,
  memory: 58.99,
  memoryPercentile: 88.25,
  note: "Push all initial rotten oranges into queue, BFS minute by minute; track fresh count and minutes."
};

function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [1,0,-1,0,1];
  const q: [number, number][] = [];
  let fresh = 0;

  // Collect initial rotten oranges and fresh count
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  if (fresh === 0) return 0;

  let minutes = -1; // will increment to 0 on first layer
  while (q.length) {
    for (let size = q.length; size > 0; size--) {
      const [r, c] = q.shift()!;
      for (let k = 0; k < 4; k++) {
        const nr = r + dirs[k];
        const nc = c + dirs[k + 1];
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        q.push([nr, nc]);
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}

// quick sanity
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4

