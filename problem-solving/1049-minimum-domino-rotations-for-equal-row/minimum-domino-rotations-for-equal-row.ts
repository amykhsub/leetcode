/**
 * Approach: Iteration with Greedy
 * 
 * Greedy: if solution exists, it must be achievable 
 *      to make all tops or all bottoms equal to one of the first domino values.
 * 
 * Counting rotations:
 *      - early exit if for any domino neither top nor bottom value matches the `valueToCheck`
 *      - go to next iteration if both values of domino matches the `valueToCheck`
 * 
 * Count rotations for another value of the first domino `bottoms[0]`
 *      only if it's impossible to make all tops or all bottoms the same with initial test value `tops[0]`.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function minDominoRotations(tops: number[], bottoms: number[]): number {
    const n = tops.length;
    const rotationsCount = countRotations(tops[0], bottoms, tops, n);

    if (rotationsCount != -1 || tops[0] == bottoms[0]) {
        return rotationsCount;
    }

    return countRotations(bottoms[0], bottoms, tops, n);
};

function countRotations(valueToCheck: number, targetBottoms: number[], targetTops: number[], n: number): number {
    let bottomRotationsCount = 0;
    let topRotationsCount = 0;

    for (let i = 0; i < n; i++) {
        const isBottomValueDifferent = targetBottoms[i] !== valueToCheck;
        const isTopValueDifferent = targetTops[i] !== valueToCheck

        if (isBottomValueDifferent && isTopValueDifferent) {
            return -1;
        }

        if (isBottomValueDifferent) {
            bottomRotationsCount++;
        } else if (isTopValueDifferent) {
            topRotationsCount++;
        }
    }

    return Math.min(bottomRotationsCount, topRotationsCount);
};
