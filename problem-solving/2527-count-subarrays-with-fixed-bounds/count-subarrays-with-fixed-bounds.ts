/**
 * Approach: Sliding Window
 * 
 * Solution uses an idea of maintaining valid subarray. 
 *      `leftP` variable is left boundary of potential valid subarray.
 *          When `k` is outside the [`minK`, `maxK`] range, `leftP` is used to "slide" the window.
 *      `Math.min(maxP, minP)` is right boundary of valid subarray. We could save it as 'rightP' if needed.
 * 
 * Early exit from the step of iteration if `leftP` is updated. Because in this case: 
 *      `k` can't be equal to minK or maxK
 *      `leftP` is greater than both previously saved points `maxP` & `minP`. So there's no valid subarray to count.
 * 
 * ? why `maxP`, `minP`, `leftP` are initialized with '-1'
 * This approach is used to track the last seen index of something within array, when iteration starts from `0` item.
 *      `minK` or `maxK` haven't been seen yet at point `num[0]`. 
 *          Until both inputs are appeared in array, `Math.min(maxP, minP)` returns '-1' 
 *              and with any `leftP` no subarrays are counted according to problem description.
 *      Imagine num[0] is equal to `minK` and `maxK`, so `maxP`and `minP` are set to 0.
 *          If `leftP` was initialized with `0`, `Math.min(maxP, minP) - leftP` is `0`, 
 *              but `1` is expected for valid subarray to count.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function countSubarrays(nums: number[], minK: number, maxK: number): number {
    let maxP = -1;
    let minP = -1;
    let leftP = -1;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        const k = nums[i];

        if (k < minK || k > maxK) {
            leftP = i;
            continue;
        }

        if (k === maxK) {
            maxP = i;
        }

        if (k === minK) {
            minP = i;
        }

        count += Math.max(0, Math.min(maxP, minP) - leftP);
    }

    return count;
};
