/**
 * Approach: Sliding Window
 * 
 * The core of Sliding Window technique is the use of 2 pointers: start of window (`i`) and end of window(`j`).
 *      `j` iterates through array, expanding the window to the right.
 *      `i` moves forward, shrinking the window from the left.
 * The window `[i, j]` represents a potential subarray. 
 *      The goal is to keep this window valid according to the problem's constraints.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function longestSubarray(nums: number[]): number {
    let i = 0, j = 0;

    for (let zero = 0; j < nums.length; j++) {
        if (nums[j] < 1) {
            zero++;
        };

        if (zero > 1 && nums[i++] < 1) {
            zero--;
        }
    }

    return j - i - 1;
};
