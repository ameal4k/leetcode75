import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 2130,
    problem: "Maximum Twin Sum of a Linked List",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // We traverse the list 3 times: finding mid, reversing, and calculating max sum.
    spaceComplexity: "O(1)", // We reverse in-place without extra data structures.
    constraints: {
        listSize: "2 <= list.length <= 10^5 (even length only)",
        nodeValues: "1 <= Node.val <= 10^5"
    },
    exampleInput: [5, 4, 2, 1],
    expectedOutput: 6,
    runtime: 5, // Execution time in milliseconds
    runtimePercentile: 87.96, // Percentile ranking for runtime performance
    memory: 78.94, // Memory usage in MB
    memoryPercentile: 67.08, // Percentile ranking for memory efficiency
    note: "Optimized solution using slow & fast pointers to find the middle, in-place reversal, and two-pointer traversal."
};

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function pairSum(head: ListNode | null): number {
    if (!head) return 0; // ✅ Edge case: Empty list

    // 🛠 Step 1: Find the middle of the linked list using slow & fast pointers
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }

    // 🛠 Step 2: Reverse the second half of the linked list in place
    let prev: ListNode | null = null;
    let curr: ListNode | null = slow;

    while (curr) {
        let nextTemp: ListNode | null = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    // 🛠 Step 3: Calculate the maximum twin sum while traversing both halves
    let first: ListNode | null = head;
    let second: ListNode | null = prev;
    let maxTwinSum = 0;

    while (second) {
        maxTwinSum = Math.max(maxTwinSum, first!.val + second.val);
        first = first!.next;
        second = second.next;
    }

    return maxTwinSum;
}

// 🔥 Example Test Cases
const list1 = new ListNode(5, new ListNode(4, new ListNode(2, new ListNode(1))));
console.log(pairSum(list1)); // ✅ Expected Output: 6

const list2 = new ListNode(4, new ListNode(2, new ListNode(2, new ListNode(3))));
console.log(pairSum(list2)); // ✅ Expected Output: 7

const list3 = new ListNode(1, new ListNode(100000));
console.log(pairSum(list3)); // ✅ Expected Output: 100001
