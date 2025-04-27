/**
 * Approach: Traversal imperative
 * 
 * Time: O(n)
 * Space: O(1)
 */
function countSubarrays(nums: number[]): number {
    let count = 0;

    for (let i = 2; i < nums.length; i++) {
        if (nums[i] + nums[i - 2] === nums[i - 1] / 2) {
            count++;
        }
    }

    return count;
};
