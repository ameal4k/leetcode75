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
    runtime?: number; // Execution time in milliseconds
    runtimePercentile?: number; // Percentile ranking for runtime performance
    memory?: number; // Memory usage in MB
    memoryPercentile?: number; // Percentile ranking for memory efficiency
    note?: string;
};
