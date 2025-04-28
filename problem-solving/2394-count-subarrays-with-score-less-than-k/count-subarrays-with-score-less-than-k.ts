/**
 * Approach: Sliding Window with Prefix Sum
 * 
 * Sliding Window is defined by [pL, pR] and represents a subarray.
 * 
 * Prefix Sum (`prefix`) maintains the sum of subarray items.
 * 
 * `prefix * (pR - pL + 1)` calculates the score of subarray.
 * 
 * Time: O(n)
 *      - `for` loop itself takes O(n) 
 *      - nested `while` loop doesn't introduce a quadratic factor because `pL` only moves forward.
 * Space: O(1)
 */
function countSubarrays(nums: number[], k: number): number {
    let n = nums.length;
    let count = 0;
    let prefix = 0;

    for (let pL = 0, pR = 0; pR < n; pR++) {
        prefix += nums[pR];

        while (prefix * (pR - pL + 1) >= k) {
            prefix -= nums[pL++];
        }

        count += pR - pL + 1;
    }

    return count;
};
