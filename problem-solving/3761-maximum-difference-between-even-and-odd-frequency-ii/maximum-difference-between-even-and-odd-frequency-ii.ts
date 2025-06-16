/**
 * Approach: Brute-Force Pair Iteration with
 * - Sliding Window
 * - Parity Tracking with Minimums
 * - Pre-computation of Frequencies (Prefix Sum Array)
 * - Bitwise Manipulation with bitwise and (&) operator
 * 
 * Pre-computation of Frequencies allows to get frequency of any character within the substring.
 *      The frequency of character `d` in a substring `s[left ... right]` 
 *          can be calculated as `freq[d][right + 1] - freq[d][left]`.
 * 
 * Brute-Force `for (let a = 0; a < 5; a++)` iterates through all possible pairs of distinct characters ('0' to '4').
 *      Iterating through all 5 * 4 = 20 pairs is a small constant factor.
 * 
 * `getMaxDiff` function implements Sliding Window with Parity Tracking.
 *      For pair of characters `a` and `b` function finds substring that maximizes `freq[a] - freq[b]`
 *          (Parity-based Minimum Tracking)
 *      The `left` and `right` pointers define current window.
 *      Prefix Sums `freqA` and `freqB` calculates frequencies up to current `right` boundary of window.
 *      `minFreq[pa][pb]` stores the minimum value of `prevA - prevB` for substrings 
 *          whose `a` frequency has parity `pa` and `b` frequency has parity `pb`.
 *          `pa` is `prevA & 1`
 *          `pb` is `prevB & 1`
 *          `prevX & 1` (0 if even, 1 if odd)
 * 
 * `while` loop ensures `b` has non-zero even frequency withing substring s[left ... right].
 *      `freqB - prevB` is frequency of `b` in the substring.
 *      `>= 2` checks if frequency of `b` is at least 2 (non-zero even number).
 *      `true` of `while` condition means we have valid starting point for substring that ends at `right`.
 * 
 * `candidate` value calculation maximizes the difference with parity constraints.
 *      We need `(freqA - prevA) - (freqB - prevB)` to be maximized. Equivalent is `(freqA - freqB) - (prevA - prevB)`.
 *      We need frequency of `a` (`freqA - prevA`) to be odd and frequency of `b` (`freqB - prevB`) to be non-zero even.
 *      `1 - (freqA & 1)`:
 *          if `freqA` is odd, we need `prevA` to be even to make `freqA - prevA` odd (minFreq[1][...]).
 *          if `freqA` is even, we need `prevA` to be odd (`minFreq[0][...]`).
 *          This is to handle parity requirement for character `a`.
 *      `freqB & 1`: we need `freqB - prevB` to be even. 
 *          For this `freqB` and `prevB` must have the same parity (minFreq[...][freqB & 1]).
 * 
 * Time: O(n) because size of the character set (`c`) is fixed at 5
 *      - prefix sums calculation costs O(n * c) which is O(n)
 *      - outer loop `for` costs O(c²) which is O(1)
 *      - `getMaxDiff` costs O(n) because `left` pointer inside `while` loop only moves forward.
 *      - total O(n * n) + O(c² * n) with c = 5 can be simplified to O(n)
 * Space: O(n) because dominant space usage comes from `freq` array with O(c * n)
 */
function maxDifference(left: string, k: number): number {
    const n = left.length;
    const ZERO_CODE = 48;
    const freq: Uint16Array<ArrayBuffer>[] = Array.from({ length: 5 }, () => new Uint16Array(n + 1).fill(0));

    for (let i = 0; i < n; i++) {
        for (let d = 0; d < 5; d++) {
            freq[d][i + 1] = freq[d][i];
        }

        freq[left.charCodeAt(i) - 48][i + 1]++;
    }

    let diffMax = Number.NEGATIVE_INFINITY;

    for (let a = 0; a < 5; a++) {
        if (freq[a][n] === 0) {
            continue;
        }

        for (let b = 0; b < 5; b++) {
            if (a === b || freq[b][n] === 0) {
                continue;
            }

            const diff = getMaxDiff(a, b, k, n, freq);

            if (diff > diffMax) {
                diffMax = diff;
            }
        }
    }

    return diffMax;
}

function getMaxDiff(a: number, b: number, substrMinSize: number, n: number, freq: Uint16Array<ArrayBuffer>[]): number {
    let diff = Number.NEGATIVE_INFINITY;

    const minFreq: number[][] = [
        [Infinity, Infinity],
        [Infinity, Infinity]
    ];

    let freqA = 0;
    let freqB = 0;
    let prevA = 0;
    let prevB = 0;

    for (let left = 0, right = substrMinSize - 1; right < n; right++) {
        freqA = freq[a][right + 1];
        freqB = freq[b][right + 1];

        while (right - left + 1 >= substrMinSize && freqB - prevB >= 2) {
            const diff = prevA - prevB;
            const prevF = minFreq[prevA & 1][prevB & 1];

            if (diff < prevF) {
                minFreq[prevA & 1][prevB & 1] = diff;
            }

            prevA = freq[a][left + 1];
            prevB = freq[b][left + 1];
            left++;
        }

        const candidate = freqA - freqB - minFreq[1 - (freqA & 1)][freqB & 1];

        if (candidate > diff) {
            diff = candidate;
        }
    }

    return diff;
}
