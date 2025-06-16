/**
 * Approach: Binary Search with
 * - Sorting
 * - Greedy
 * 
 * Minimizing the maximum difference among pairs means that we need elements that are close to each other in value.
 *      The sorting is important for that.
 * 
 * 'minimize the maximum' or 'maximize the minimum' pattern is classic indicator for binary search on the answer.
 * 
 * `diffs` stores precomputed difference.
 * 
 * `while` loop is used for binary search. 
 *      We need to find smallest `mid` for which we can form at least `p` pairs 
 *          with a difference less than or equal to `mid`.
 *      `nums` is sorted, so `sortedNums[d]` and `sortedNums[d+1]` have difference diffs[d].
 *  
 * Greedy Approach is used to count the maximum number of valid pairs for given maximum difference.
 * `diffs[d] <= mid` means we can form a valid pair using `sortedNums[d]` and `sortedNums[d+1]` (`pairsCount++`).
 *      Because we can't use this pair again, we jump by 2 (`d += 2`) to skip `sortedNums[d+1]` and `sortedNums[d+2]`
 * 
 * `pairsCount < p` means `mid` is too small to form `p` pairs.
 * `pairsCount >= p` means `mid` is large enough or smaller than necessary.
 * 
 * `Uint32Array` is more effective for numbers than general array. It also provides native sorting for numbers.
 * 
 * Time: O(n * log(n) + n * log(d)) or simplified to O(n*log(n))
 *      - sorting nums costs O(n log(n))
 *      - `diffs` calculate costs O(n)
 *      - binary search O(log(d)) where `d` is the range of differences
 *      - pairs counting costs O(n)
 * Space: O(n) because `diffs` and `sortedNums` take O(n) space
 */
function minimizeMax(nums: number[], p: number): number {
    const n = nums.length;

    if (p === 0 || n < 2) {
        return 0;
    }

    const sortedNums = Uint32Array.from(nums).sort();
    const diffsSize = n - 1;
    const diffs = new Uint32Array(diffsSize);

    for (let i = 0; i < diffsSize; i++) {
        diffs[i] = sortedNums[i + 1] - sortedNums[i];
    }

    let low = 0;
    let high = sortedNums[n - 1] - sortedNums[0];

    while (low < high) {
        const mid = (low + high) >>> 1;
        let pairsCount = 0;

        for (let d = 0; d < diffsSize && pairsCount < p;) {
            if (diffs[d] <= mid) {
                pairsCount++;
                d += 2;
            } else {
                d += 1;
            }
        }

        if (pairsCount < p) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}
