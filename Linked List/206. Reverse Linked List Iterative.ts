import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 206,
    problem: "Reverse Linked List (Iterative)",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // Each node is visited once
    spaceComplexity: "O(1)", // Only a few extra pointers used
    constraints: {
        listLength: "0 <= list.length <= 5000",
        nodeValue: "-5000 <= Node.val <= 5000"
    },
    exampleInput: [1, 2, 3, 4, 5],
    expectedOutput: [5, 4, 3, 2, 1],
    runtime: 0, // To be filled in
    runtimePercentile: 100, // To be filled in
    memory: 58.86, // To be filled in
    memoryPercentile: 18.62, // To be filled in
    note: "Optimized iterative approach with minimal memory overhead."
};

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;

    while (current) {
        let next: ListNode | null = current.next; // ✅ Store next node
        current.next = prev; // ✅ Reverse pointer
        prev = current; // ✅ Move prev forward
        current = next; // ✅ Move current forward
    }

    return prev; // ✅ New head of reversed list
}

// 🔥 Example Test Cases
const example1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(reverseList(example1)); // ✅ Expected Output: [5, 4, 3, 2, 1]

const example2 = new ListNode(1, new ListNode(2));
console.log(reverseList(example2)); // ✅ Expected Output: [2,1]

const example3 = null;
console.log(reverseList(example3)); // ✅ Expected Output: []
