/**
 * Approach: Two Pointers with
 * - Sorting
 * - Divide and Conquer
 * - Include-Exclude
 * 
 * Per requirements `0 <= i < j < n`, index `i` should be less than index `j`.
 * But the order of numbers doesn't change the sum: nums[i] + nums[j] = nums[j] + nums[i]
 * And there's no limitation by subarrays, where position of subarray boundaries matters. Entire array is used.
 * Hence it's possible to change the order of `nums` items, it's allowed to sort them.
 * And sorted array enable us to use different techniques like Include-Exclude, Binary Search, Two Pointers, etc.
 * 
 * Counting within specific range [lower, upper] is equal to [0, upper] - [0, lower].
 * There're 2 sub-tasks: count up to `upper` and count up to `lower`.
 * 
 * Two Pointers technique with pointers move in direction of each other allow to iterate through array only once 
 * resulting time complexity O(n) 
 *
 * Time: O(n * log(n)) because of dominated sorting step
 * Space: O(n) due to potential temporary array creation by sorting algorithm for large input array
 */
function countFairPairs(nums: number[], lower: number, upper: number): number {
    nums.sort((a, b) => a - b);

    return countPairsBelowLimit(nums, upper + 1) - countPairsBelowLimit(nums, lower);
};

function countPairsBelowLimit(arr: number[], limit: number): number {
    let count = 0;

    for (let i = 0, j = arr.length - 1; i < j;) {
        if (arr[i] + arr[j] < limit) {
            count += j - i++;
        } else {
            j--;
        }
    }

    return count;
}
