/**
 * Approach: Sliding Window
 * 
 * Time: O(n)
 * Space: O(1)
 */
function longestOnes(nums: number[], k: number): number {
    let i = 0, j = 0;

    for (; j < nums.length; j++) {
        if (nums[j] === 0) {
            k--;
        }

        if (k < 0 && nums[i++] === 0) {
            k++;
        }
    }

    return j - i;
};
