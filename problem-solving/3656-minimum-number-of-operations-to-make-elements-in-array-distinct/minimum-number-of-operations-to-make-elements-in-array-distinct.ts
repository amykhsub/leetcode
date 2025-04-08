/**
 * Approach: Hash Table, Reverse Traversal (Backward).
 * 
 * Time: O(n)
 * Space: O(n)
 */
function minimumOperations(nums: number[]): number {
    const hash = new Set<number>();

    for (let i = nums.length - 1; i >= 0; i--) {
        if (hash.has(nums[i])) {
            return (i / 3 >> 0) + 1;
        }

        hash.add(nums[i]);
    }

    return 0;
};
