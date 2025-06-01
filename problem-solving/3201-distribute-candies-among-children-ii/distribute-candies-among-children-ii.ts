/**
 * Approach: Inclusion-Exclusion Principle with Combinatorics (Stars and Bars)
 * 
 * We need to find non-negative solutions for `c1 + c2 + c3 = n` (Stars and Bars)
 * 
 * Inclusion-Exclusion Principle (PIE):
 *      - `countComb(0)` calculates the total number of ways to distribute `n` candies among 3 children 
 *          without any upper limits.
 *      - `countComb(1)` calculates the number of ways if 1 child is forced to have `limit + 1` or more candies.
 *          We pre-assign `limit + 1` number of candies to 1 of children.
 *          There are 3 such cases where child 1, child 2, or child 3 exceeding the limit. That's why `countComb(1) * 3`
 *      - `countComb(2)` calculates the number of ways if 2 children are forced to have `limit + 1` or more candies. 
 *          There are also 3 cases.
 *      - `countComb(3)` calculates the number of ways if 3 children are forced to have `limit + 1` or more candies.
 *      - alternating sign (i.e. A0 minus A1 plus A2 minus A3) is characteristic of PIE 
 *          to ensure that every element that violates at least one property 
 *          (i.e., at least 1 child is over the limit) is subtracted exactly once from initial total.
 * 
 * `n + 2` corresponds to `N + K - 1` term in 'Stars and Bars' formula for 3 'bins' (children), 
 *      distributing `N` indistinguishable items into `K` distinguishable 'bins'.
 *      E.g. when `x` is 0, then `y` becomes `n + 2` 
 *          and `countComb` returns `y * (y - 1) / 2` 
 *          which is `(n + 2) * (n + 1) / 2` -- 'Stars and Bars' combinatorial formula 
 *              for distributing indistinguishable items into distinguishable bins, 
 *              where each bin can receive zero or more items.
 * 
 * `y < 0` handle the case when it is impossible to distribute required number of candies. 
 * 
 * Time: O(1)
 * Space: O(1)
 */
function distributeCandies(n: number, limit: number): number {
    const nPlus2 = n + 2;
    const overLimit = limit + 1;

    const countComb = (x: number): number => {
        const y = nPlus2 - overLimit * x;

        if (y < 0) {
            return 0;
        }

        return y * (y - 1) / 2;
    }

    return countComb(0) -
        countComb(1) * 3 +
        countComb(2) * 3 -
        countComb(3);
};
