import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 2095,
    problem: "Delete the Middle Node of a Linked List",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // Single pass through the list
    spaceComplexity: "O(1)", // Only a few extra pointers used
    constraints: {
        listLength: "1 <= list.length <= 10^5",
        nodeValue: "1 <= Node.val <= 10^5"
    },
    exampleInput: [1, 3, 4, 7, 1, 2, 6],
    expectedOutput: [1, 3, 4, 1, 2, 6],
    runtime: 3, // To be filled in
    runtimePercentile: 93.11, // To be filled in
    memory: 101.54, // To be filled in
    memoryPercentile: 18.03, // To be filled in
    note: "Optimized two-pointer approach for efficiency."
};

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function deleteMiddle(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return null; // ✅ If there's only one node, remove it

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    let prev: ListNode | null = null; // ✅ Keeps track of node before slow

    while (fast && fast.next) {
        prev = slow;
        slow = slow!.next;
        fast = fast.next.next;
    }

    // ✅ Delete the middle node
    prev!.next = slow!.next;

    return head;
}

// 🔥 Example Test Cases
const example1 = new ListNode(1, new ListNode(3, new ListNode(4, new ListNode(7, new ListNode(1, new ListNode(2, new ListNode(6)))))));
console.log(deleteMiddle(example1)); // ✅ Expected Output: [1,3,4,1,2,6]

const example2 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(deleteMiddle(example2)); // ✅ Expected Output: [1,2,4]

const example3 = new ListNode(2, new ListNode(1));
console.log(deleteMiddle(example3)); // ✅ Expected Output: [2]
