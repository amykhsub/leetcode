/**
 * Approach: Hash Map
 * 
 * Time: O(n), where `n` is nums.length
 * Space: O(n)
 */
function minOperations(nums: number[], k: number): number {
    const hash = new Set<number>();

    for (const num of nums) {
        if (num > k) {
            hash.add(num);
            continue;
        }

        if (num < k) {
            return -1;
        }
    }

    return hash.size;
};
