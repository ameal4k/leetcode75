import { Info } from "../types";

export const info: Info = {
  problemNumber: 841,
  problem: "Keys and Rooms",
  source: "LeetCode",
  difficulty: "Medium",
  timeComplexity: "O(n + e)", // n rooms, e total keys
  spaceComplexity: "O(n)", // visited array + queue/stack
  constraints: {
    roomCount: "2 <= n <= 1000",
    keysTotal: "1 <= sum(rooms[i].length) <= 3000"
  },
  exampleInput: "[[1],[2],[3],[]]",
  expectedOutput: true,
  runtime: 0,
  runtimePercentile: 100,
  memory: 58.04,
  memoryPercentile: 66.05,
  note: "BFS using a queue to traverse reachable rooms via collected keys."
};

function canVisitAllRooms(rooms: number[][]): boolean {
  const n = rooms.length;
  const visited = new Uint8Array(n);
  const queue: number[] = [0];
  visited[0] = 1;
  let idx = 0;

  while (idx < queue.length) {
    const room = queue[idx++];
    for (const key of rooms[room]) {
      if (!visited[key]) {
        visited[key] = 1;
        if (queue.push(key) === n) return true; // early exit when queue length hits n
      }
    }
  }
  return queue.length === n;
}
