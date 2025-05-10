/**
 * Approach: Suffix Sum and Prefix Sum
 * 
 * Suffix Sum `rightSum` represents the total sum of entire array (numbers to the right of 0 index).
 * Built-in `reduce` demonstrates better performance than `for` loop in this case.
 * 
 * Prefix Sum approach is used to calculate the sum of numbers to the left of index `i` 
 *      instead of recalculating the sum in each iteration.
 * 
 * Early exit if input has only 1 number (based on task description).
 * 
 * Time: O(n) because of `reduce` and `for` loops
 * Space: O(1)
 */
function pivotIndex(nums: number[]): number {
    if (nums.length === 1) {
        return 0;
    }

    let rightSum = nums.reduce((acc, v) => acc + v, 0);
    let leftSum = 0;

    for (let i = 0; i < nums.length; i++) {
        rightSum -= nums[i];

        if (leftSum === rightSum) {
            return i;
        }

        leftSum += nums[i];
    }

    return -1;
};
