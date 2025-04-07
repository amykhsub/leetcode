/**
 * Approach: Dynamic programming with 1D array
 * 
 * 1D array represents whether a subset with a sum of i can be formed using elements from nums.
 * Empty subset (with a sum of 0) is always possible.
 * 
 * reachableSums[i - num] represents whether a subset with a sum of `i - num` can be formed using previous numbers.
 * `true` means we can form a subset with sum `i` by including the current num.
 * 
 * Time: O(n*m), where m is a sum of subset
 * Space: O(m), where m is a sum of subset
 */
function canPartition(nums: number[]): boolean {
    const total = nums.reduce((acc, num) => acc + num, 0);

    if (total % 2 > 0) return false;

    const half = total / 2;
    const reachableSums = Array<boolean>(half + 1);
    
    reachableSums[0] = true;

    for (const num of nums) {
        for (let i = half; i >= num; i--) {
            reachableSums[i] ||= reachableSums[i - num];
        }
    }

    return Boolean(reachableSums[half]);
};
