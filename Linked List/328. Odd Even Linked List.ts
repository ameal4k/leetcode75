import { Info } from "../types"; // Adjust path based on your project structure

export const info: Info = {
    problemNumber: 328,
    problem: "Odd Even Linked List",
    source: "LeetCode",
    difficulty: "Medium",
    timeComplexity: "O(n)", // We traverse the list once.
    spaceComplexity: "O(1)", // We rearrange nodes in place without extra space.
    constraints: {
        listSize: "0 <= list.length <= 10^4",
        nodeValues: "-10^6 <= Node.val <= 10^6"
    },
    exampleInput: [1, 2, 3, 4, 5],
    expectedOutput: [1, 3, 5, 2, 4],
    runtime: 0, // Execution time in milliseconds
    runtimePercentile: 100, // Percentile ranking for runtime performance
    memory: 59.49, // Memory usage in MB
    memoryPercentile: 37.63, // Percentile ranking for memory efficiency
    note: "Optimized in-place reordering using two pointers: one for odd indices and one for even indices. Preserves relative order within each group."
};

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function oddEvenList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head; // ✅ Edge case: Empty list or single node

    let odd: ListNode | null = head; // ✅ Explicitly allowing `null`
    let even: ListNode | null = head.next; // ✅ Explicitly allowing `null`
    let evenHead: ListNode | null = even; // ✅ Storing the head of the even list

    while (even && even.next) {
        odd!.next = even.next; // ✅ Move odd pointer (using `!` since odd is non-null here)
        odd = odd!.next; // ✅ Move to the next odd node

        even.next = odd!.next; // ✅ Move even pointer (using `!`)
        even = even.next;
    }

    odd!.next = evenHead; // ✅ Append even list at the end of odd list
    return head;
}

// 🔥 Example Test Cases
const list1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(oddEvenList(list1)); // ✅ Expected Output: [1,3,5,2,4]

const list2 = new ListNode(2, new ListNode(1, new ListNode(3, new ListNode(5, new ListNode(6, new ListNode(4, new ListNode(7)))))));
console.log(oddEvenList(list2)); // ✅ Expected Output: [2,3,6,7,1,5,4]

const list3 = new ListNode(1);
console.log(oddEvenList(list3)); // ✅ Expected Output: [1]

const list4 = null;
console.log(oddEvenList(list4)); // ✅ Expected Output: null