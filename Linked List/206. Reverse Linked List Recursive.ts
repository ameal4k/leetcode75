import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 206,
    problem: "Reverse Linked List (Recursive)",
    source: "LeetCode",
    difficulty: "Easy",
    timeComplexity: "O(n)", // We process each node exactly once.
    spaceComplexity: "O(n)", // Recursion creates a call stack proportional to the list length.
    constraints: {
        listSize: "0 <= list.length <= 5000",
        nodeValues: "-5000 <= Node.val <= 5000"
    },
    exampleInput: [1, 2, 3, 4, 5],
    expectedOutput: [5, 4, 3, 2, 1],
    runtime: 1, // Execution time in milliseconds
    runtimePercentile: 19.76, // Percentile ranking for runtime performance
    memory: 59.08, // Memory usage in MB
    memoryPercentile: 9.86, // Percentile ranking for memory efficiency
    note: "Recursive approach suffers from high memory usage due to call stack buildup (O(n) space). The iterative approach is preferred in practice as it avoids recursion overhead and runs in O(1) space."
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
    // Base case: If the list is empty or has only one node, return it
    if (!head || !head.next) return head;

    // Recursively reverse the rest of the list
    let reversedHead = reverseList(head.next);

    // Set the next node's next pointer back to current node
    head.next.next = head;

    // Sever the original link
    head.next = null;

    return reversedHead;
}

// 🔥 Example Test Cases
const list1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(reverseList(list1)); // ✅ Expected Output: [5,4,3,2,1]

const list2 = new ListNode(1, new ListNode(2));
console.log(reverseList(list2)); // ✅ Expected Output: [2,1]

const list3 = null;
console.log(reverseList(list3)); // ✅ Expected Output: []

