/**
 * Approach: Greedy with Lexicographical Tree
 * 
 * Lexicographical Tree is a tree where parent P has children P0, P1, ..., P9.
 *      E.g. 1 has 10, 11, ..., 19; 5 has 50, 51, 52, ..., 59
 * 
 * Greedy approach build k-th number digit by digit or moving to the next tree sibling or the nex tree level.
 *      If current subtree with parent `cursor` doesn't have k-th number we go to the next sibling (`current++`). 
 *          E.g.: 1,2,3,4,...
 *      If current subtree with parent `cursor` has k-th number we go to the first child (`cursor *= 10`).
 *          E.g.: 3,30,300,3000,...
 *      Decision on moving direction is based on numbers counting. 
 *          `stepsCount` tracks the number of children in subtree (range [cStart, cEnd]).
 *          `cStart` represents current cursor and looks like 1, 10, 100
 *          `cEnd` represents the next cursor and looks like 2, 20, 200
 *          `cStart *= 10` and `cEnd *= 10` move numbers to the next level of tree, e.g. from 1 to 10, 100, ...
 * 
 * We have `stepsMax` as `k - 1` because we start with 1 (which is also in range) and need to find (k - 1)-th number.
 *      `stepsCount <= stepsMax` means the subtree doesn't include `k`.
 *          We subtract all elements of subtree and go to sibling (`cursor++`).
 *      `stepsCount > stepsMax` means the subtree includes `k` and `cursor` is a parent of subtree.
 *          We go to the next level (`cursor *= 10`). This moving is also counted as step (`stepsMax--`).
 * 
 * Time: O((log₁₀(n))²)
 *      - outer `while` costs O(log₁₀(n))
 *      - inner `while` costs O(log₁₀(n))
 *      - cursor moving to levels and siblings costs O(log₁₀(k))
 *      - total = (O(log₁₀(n)) + O(log₁₀(k))) x O(log₁₀(n)), or simplified O((log₁₀(n))²) given that `k <= n`
 * Space: O(1)
 */
function findKthNumber(n: number, k: number): number {
    let cursor = 1;
    let stepsMax = k - 1;
    const limit = n + 1;

    while (stepsMax > 0) {
        let stepsCount = 0;
        let cStart = cursor;
        let cEnd = cursor + 1;

        while (cStart < limit) {
            stepsCount += (cEnd < limit ? cEnd : limit) - cStart;
            cStart *= 10;
            cEnd *= 10;
        }

        if (stepsCount <= stepsMax) {
            cursor++;
            stepsMax -= stepsCount;
        } else {
            cursor *= 10;
            stepsMax--;
        }
    }

    return cursor;
}
