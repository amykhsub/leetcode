/**
 * Approach: Iteration with Modulo Operator for Circularity
 * 
 * `for` loop from 1 to `n` inclusive allows to compare each elements with its preceding element.
 * 
 * `nums[i % n]`- modulo operator wraps around to the first element of array.
 *      When `i === n`, `n % n` gives 0 to compare last and first elements.
 * 
 * `if (diff < 0) { diff *= -1; }` converts the `diff` to absolute value without calling the function `Math.abs()`
 * 
 * Time: O(n)
 * Space: O(1)
 */
function maxAdjacentDistance(nums: number[]): number {
    const n = nums.length;
    let maxDiff = 0;

    for (let i = 1; i <= n; i++) {
        let diff = nums[i % n] - nums[i - 1];

        if (diff < 0) {
            diff *= -1;
        }

        if (diff > maxDiff) {
            maxDiff = diff;
        }
    }

    return maxDiff;
};
