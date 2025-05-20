/**
 * Approach: Difference Array
 * 
 * Instead of updating the `nums` array for each query, difference Array `diff` stores the difference 
 *      between consecutive elements of virtual array that would result from applying all queries.
 *      But instead of iterating through this range, `diff` is updated only at two indices:
 *      - `diff[left]` represents the beginning of range where decrement starts.
 *      - `diff[right + 1]` represents the end of range where decrement stops. 
 *          By incrementing this index we cancel out decrement for subsequent elements.
 * 
 * With running sum `prefix` we have accumulated effect of applied queries - running total number of decrements.
 * 
 * If any `nums[i]` with accumulated decrements is still > 0, the `num` can not be transformed to Zero Array.
 * 
 * Time: O(q+n)
 * Space: O(n)
 */
function isZeroArray(nums: number[], queries: number[][]): boolean {
    const n = nums.length;
    const diff = new Int32Array(n + 1).fill(0);

    for (const [left, right] of queries) {
        diff[left]--;
        diff[right + 1]++;
    }

    let prefix = 0;

    for (let i = 0; i < n; i++) {
        prefix += diff[i];

        if (nums[i] + prefix > 0) {
            return false;
        }
    }

    return true;
};
