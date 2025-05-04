/**
 * Approach: Iteration with
 * - Frequency Map
 * - Canonical (Tuple) Form
 * 
 * Create consistent representation for each domino regardless of the order of its numbers ('mask'), e.g.:
 *      `[1,2]` -> `12`
 *      `[2,1]` -> `12`
 *      `[9,9]` -> `99`
 * 
 * Frequency Map tracks the frequency of each `mask`.
 *      For each domino the current frequency `f` of `mask` represents the number of equal dominoes before 
 *      that can be paired with current domino.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function numEquivDominoPairs(dominoes: number[][]): number {
    const freqMap = new Map<number, number>();
    let count = 0;

    for (const [a, b] of dominoes) {
        const mask = Math.min(a, b) * 10 + Math.max(a, b);
        const f = freqMap.get(mask) ?? 0;

        count += f;
        freqMap.set(mask, f + 1);
    }

    return count;
};
