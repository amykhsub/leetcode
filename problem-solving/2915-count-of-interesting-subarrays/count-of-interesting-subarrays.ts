/**
 * Approach: Prefix Sum with
 * - Modulo Arithmetic
 * - Hash Map
 * 
 * Time: O(n) because it iterates through the array once
 * Space: O(modulo)
 */
function countInterestingSubarrays(nums: number[], modulo: number, k: number): number {
    const n = nums.length;
    const prefixCounts = new Map<number, number>();
    let count = 0;
    let prefix = 0;

    prefixCounts.set(0, 1)

    for (let i = 0; i < n; i++) {
        prefix += nums[i] % modulo === k ? 1 : 0;
        count += prefixCounts.get((prefix - k + modulo) % modulo) ?? 0;
        prefixCounts.set(prefix % modulo, (prefixCounts.get(prefix % modulo) ?? 0) + 1);
    }

    return count;
};
