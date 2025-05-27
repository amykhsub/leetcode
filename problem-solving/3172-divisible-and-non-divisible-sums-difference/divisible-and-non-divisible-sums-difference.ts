/**
 * Approach: Math with Bit Manipulation (Bitwise Unsigned Right Shift >>>)
 * 
 * We can transform the result `num1 - num2`
 *                          as `(num1 + num2) - (num2 + num2)`
 *                          or `(num1 + num2) - 2 * num2`
 * 
 * `num1 + num2` is the sum of all integers from 1 to `n`.
 * 
 * The sum of arithmetic series can be used to get sum of all integers from 1 to `n`:
 *      Sn = n * (L + R) / 2, where `n` is number of terms, `L` is the first term, `R` is the last term.
 *      which for our problem is:
 *          Sn = n * (1 + n) / 2
 * 
 * Integers that are divisible by `m` are `1*m, 2*m, 3*m, ... k*m`, where `k*m <= n`
 * The largest integer divisible by `m` is `Math.floor(n / m) * m`.
 * So, if `k * m` is `Math.floor(n / m) * m`, then `k = Math.floor(n / m)`.
 * 
 * If sum of integers divisible by `m` ('num2') is `1*m + 2*m + ... + k*m`
 *      it equals to `m * (1 + 2 + ... + k)`
 *      and we see `(1 + 2 + ... + k)` as sum of integers in range [1, k]
 * Using the same formula to get the sum of arithmetic series,
 *      sum2 = m * (k * (k + 1) / 2)
 * 
 * We know that `(num1 + num2) = Sn = n * (n + 1) / 2`
 *          and `sum2 = m * (k * (k + 1) / 2)` where `k = Math.floor(n / m)`.
 * We can rewrite initial `num1 - num2`
 *      which is `(num1 + num2) - 2 * num2`
 *            as `(Sn)          - 2 * (m * (k * (k + 1) / 2))`
 *            or `(n * (n + 1) / 2) - (m * (k * (k + 1)))`
 *            or `n * (n + 1) / 2 - m * k * (k + 1)`
 * 
 * Time: O(1)
 * Space: O(1)
 */
function differenceOfSums(n: number, m: number): number {
    const k = n / m >>> 0;

    return n * (n + 1) / 2 - m * k * (k + 1);
};
