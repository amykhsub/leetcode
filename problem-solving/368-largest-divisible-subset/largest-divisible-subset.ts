/**
 * Approach: Dynamic Programming
 *
 * Dynamic Programming stores intermediate results to avoid redundant calculations.
 * Dynamic Programming Logic: The core logic of the subsetSizes algorithm relies on the fact that:
 *   if nums[i] is divisible by nums[k] (where k < i), then nums[i] can be added to the divisible subset ending at nums[k].
 *
 * Sorting is needed for dynamic programming approach to determine the largest divisible subset.
 * With sorted array we only need to check divisibility with elements that come before nums[i] in the sorted array.
 *
 * Time: O(n²). Sorting is O(n log n) but nested loop is dominant factor and it has O(n²)
 * Space: O(n)
 */
function largestDivisibleSubset(nums: number[]): number[] {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let maxSize = 1;
    let maxIndex = 0;

    // Stores the size of the largest divisible subset ending at each element nums[i].
    const subsetSizes = Array<number>(n).fill(1);

    for (let i = 0; i < n; ++i) {
        // Find the size of the largest divisible subset.
        for (let k = 0; k < i; ++k) {
            if (nums[i] % nums[k] === 0) {
                subsetSizes[i] = Math.max(subsetSizes[i], subsetSizes[k] + 1)

                if (maxSize < subsetSizes[i]) {
                    maxSize = subsetSizes[i];
                    maxIndex = i;
                }
            }
        }
    }

    // Constructing the largest divisible subset with Greedy Approach and Backtracking
    const subset: number[] = [];
    let maxNum = nums[maxIndex];

    for (let i = maxIndex; i >= 0; --i) {
        if (maxNum % nums[i] === 0 && maxSize === subsetSizes[i]) {
            subset.push(nums[i]);
            maxNum = nums[i];
            --maxSize;
        }
    }

    return subset;
};