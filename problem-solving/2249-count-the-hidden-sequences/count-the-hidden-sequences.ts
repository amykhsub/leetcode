/**
 * Approach: Prefix Sum with Dynamic Range Tracking
 * 
 * The main idea is to determine the boundaries of `hidden sequence` oscillation amplitude 
 *      accumulating `differences` with Prefix Sum.
 *      Compare the amplitude height with size of range `[lower, upper]` 
 *      to get the number of times we can shift entire amplitude window within the range.
 * 
 * Early exit if amplitude height is larger than the range.
 * 
 * Time: O(n) for single run of `for` loop
 * Space: O(1)
 */
function numberOfArrays(differences: number[], lower: number, upper: number): number {
    const rangeSize = upper - lower;
    let min = 0;
    let max = 0;
    let prefix = 0;

    for (const d of differences) {
        prefix += d;

        if (prefix > max) {
            max = prefix;
        } else if (prefix < min) {
            min = prefix;
        }

        if (max - min > rangeSize) {
            return 0;
        }
    }

    return rangeSize - (max - min) + 1;
};
