/**
 * Approach: Logarithm with
 * - Binary Right Shift for truncation
 * - Modulo operator for even / odd check
 * 
 * `(Math.log10(num) >> 0) % 2 === 1` is optimized version of `((Math.log10(num) + 1) >> )) % 2 === 0`
 * 
 * Time: O(n)
 * Space: O(1)
 */
function findNumbers(nums: number[]): number {
    let count = 0;

    for (const num of nums) {
        if ((Math.log10(num) >> 0) % 2 === 1) {
            count++;
        }
    }

    return count;
};
