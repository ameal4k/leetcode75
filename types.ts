// types.ts (Root Directory)

export type Info = {
    problemNumber: number;
    problem: string;
    source: string;
    difficulty: "Easy" | "Medium" | "Hard";
    timeComplexity: string;
    spaceComplexity: string;
    constraints: Record<string, string>;
    exampleInput: any;
    expectedOutput: any;
    note?: string;
};
