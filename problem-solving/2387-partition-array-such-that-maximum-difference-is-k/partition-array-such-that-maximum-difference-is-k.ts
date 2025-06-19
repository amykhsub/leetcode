/**
 * Approach: Greedy with
 * - Range-based Iteration for Implicit Sorting
 * 
 * If we sort the array (or process elements in increasing order), we can maintain the minimum element of subsequence 
 *      and check if the next element adding exceeds `k`. Once the difference exceeds `k`, we start a new subsequence. 
 *      This is the locally optimal choice that leads to globally optimal solution.
 * 
 * `min` and `max` determine the range of values we consider.
 * 
 * `presence` typed array (Uint8Array) acts as boolean array.
 * 
 * Although `nums` array isn't explicitly sorted, range-based iteration processes the numbers in increasing order 
 *      by iterating from `min` to `max` and using the `presence` array to achieve the same effect as sorting.
 * 
 * Time: O(n + r) where `r` is a range of values in nums
 * Space: O(r)
 */
function partitionArray(nums: number[], k: number): number {
    const n = nums.length;

    if (n === 1) {
        return n;
    }

    let min = nums[0];
    let max = nums[0];

    for (let i = 1; i < n; i++) {
        const num = nums[i];

        if (num < min) {
            min = num;
            continue;
        }

        if (num > max) {
            max = num;
        }
    }

    if (max - min <= k) {
        return 1;
    }

    const presence = new Uint8Array(max + 1);

    for (let i = 0; i < n; i++) {
        presence[nums[i]] = 1;
    }

    let count = 1;
    let limit = k + min;

    for (let num = min; num <= max; num++) {
        if (presence[num]) {
            if (num > limit) {
                count++;
                limit = k + num;
            }
        }
    }

    return count;
}
