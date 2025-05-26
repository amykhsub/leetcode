/**
 * Approach: Prefix Sum
 * 
 * Time: O(n)
 * Space: O(1)
 */
function largestAltitude(gain: number[]): number {
    let acc = 0;
    let max = 0;

    for (const diff of gain) {
        max = Math.max(max, acc += diff);
    }

    return max;
};
