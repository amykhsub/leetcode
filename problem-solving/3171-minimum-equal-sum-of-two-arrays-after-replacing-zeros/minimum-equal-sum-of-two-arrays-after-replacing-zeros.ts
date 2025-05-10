/**
 * Approach: Array traversal
 * 
 * Each `0` can be replaced wit any number in range [1, 10^6].
 *      Replacing all `0` with positive number, min sum of all elements = sum(positive) + count(0).
 * 
 * It's possible to get equal sum of arrays if sum(numsN) < minSum(numsM).
 *      E.g.: nums1[0,5,0,0,0] can be aligned with nums2[3,4,5,6], by replacing with [1,5,1,1,x],
 *      where x = sum(nums2) - sum(nums1) - (count(0 of nums1) - count(itself))
 *              = 18 - 5 - (4 - 1) = 8
 * 
 * For cases, when array has no `0` and its elements sum is less than min sum of opposite array,
 *      it's not achievable to have equal sum of both arrays.
 * 
 * In corner case, when one array has 10^5 elements of 10^6 values and another array has at least 1 value < 10^6,
 *      we can not consider the formula `sum(positive) + count(0)`,
 *      because `0` must be replaced with value that our of `Constraints` limitation.
 *      But the case is out of scope, 
 *          because problem description has only min boundary of value for `0` replacement.
 * 
 * Time: O(n + m) because the sizes of arrays can have significant difference.
 * Space: O(1)
 */
function minSum(nums1: number[], nums2: number[]): number {
    let zero1 = 0;
    let sum1 = 0;

    for (let i = 0; i < nums1.length; i++) {
        if (nums1[i]) {
            sum1 += nums1[i];
        } else {
            zero1++;
        }
    }

    let zero2 = 0;
    let sum2 = 0;

    for (let i = 0; i < nums2.length; i++) {
        if (nums2[i]) {
            sum2 += nums2[i];
        } else {
            zero2++;
        }
    }

    const min1 = sum1 + zero1;
    const min2 = sum2 + zero2;

    if ((zero1 === 0 && min2 > sum1) || (zero2 === 0 && min1 > sum2)) {
        return -1;
    }

    return Math.max(min1, min2);
};
