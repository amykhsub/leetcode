/**
 * Approach: Greedy with single traversal
 * 
 * The algorithm uses the idea of iteratively updating a maximum value as it traverses the input.
 * It avoids nested loops by maintaining maxK and maxDiff.
 * While the idea is similar to Kadane's algorithm 
 * (which is is specifically designed to find the maximum sum of a contiguous subarray within a one-dimensional array),
 * this solution is not finding a contiguous subarray,
 * because it's based on a specific formula that utilizes the maximum values.
 * 
 * The loop iterates through the nums array from left to right.
 * The calculations are performed in the backward order:
 * 1) maxV is 3rd part of the triplet calculation.
 * 2) maxDiff is 2nd part of the triplet calculation.
 * 3) maxK is 1st part of the triplet calculation.
 * Because we want to use the values from previous iteration before they are updated.
 * This approach helps traverse the input with single loop
 * and avoid additional calculation with "i" inside each iteration.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function maximumTripletValue(nums: number[]): number {
    let maxK = 0;
    let maxDiff = 0;
    let maxV = 0;

    for (let i = 0; i < nums.length; i++) {
        maxV = Math.max(maxV, maxDiff * nums[i]);
        maxDiff = Math.max(maxDiff, maxK - nums[i]);
        maxK = Math.max(maxK, nums[i]);
    }

    return maxV;
};
