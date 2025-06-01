import { Info } from "../types";

export const info: Info = {
  problemNumber: 1926,
  problem: "Nearest Exit from Entrance in Maze",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(m*n)", // BFS visits each cell at most once
  spaceComplexity: "O(m*n)", // queue + visited grid
  constraints: {
    dimensions: "1 <= m, n <= 100",
    cellValues: "maze[i][j] is '.' or '+'"
  },
  exampleInput: {
    maze: [ ["+","+",".","+"],[".",".",".","+"],["+","+","+","."] ],
    entrance: [1,2]
  },
  expectedOutput: 1,
  runtime: 16,
  runtimePercentile: 99.19,
  memory: 65.06,
  memoryPercentile: 96.34,
  note: "Standard BFS from entrance; first time we dequeue a border '.' (not entrance) we return distance."
};

function nearestExit(maze: string[][], entrance: number[]): number {
  const m = maze.length;
  const n = maze[0].length;
  const dirs = [1,0,-1,0,1];
  const q: [number, number, number][] = [[entrance[0], entrance[1], 0]]; // row,col,dist
  maze[entrance[0]][entrance[1]] = '+'; // mark visited

  while (q.length) {
    const [r,c,d] = q.shift()!;
    for (let k=0;k<4;k++) {
      const nr = r + dirs[k];
      const nc = c + dirs[k+1];
      if (nr<0 || nr>=m || nc<0 || nc>=n || maze[nr][nc] === '+') continue;
      if (nr===0 || nr===m-1 || nc===0 || nc===n-1) return d+1;
      maze[nr][nc] = '+'; // mark visited
      q.push([nr,nc,d+1]);
    }
  }
  return -1;
}

// quick sanity
console.log(nearestExit([["+","+",".","+"],[".",".",".","+"],["+","+","+","."]],[1,2])); // 1
