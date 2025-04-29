/**
 * Approach: Sliding Window
 * 
 * Pointers `pL` and `pR` represent the boundaries of Sliding Window.
 * 
 * Frequency counter `freq` tracks how many times the max element appears within the current sliding window.
 * 
 * Once `freq` reaches `k`, the number of valid subarrays ending at `pR` is accumulated 
 *      based on the position of `pL`, because all previous positions of `pL` are start points of valid subarray.
 * 
 * Time: O(n)
 *      - `for` loop itself takes O(n)
 *      - inner `while` doesn't increase complexity because it doesn't restart `pL` for each iteration of `for` loop.
 * Space: O(1)
 */
function countSubarrays(nums: number[], k: number): number {
    const n = nums.length;
    const maximum = Math.max(...nums);
    let freq = 0;
    let count = 0;

    for (let pL = 0, pR = 0; pR < n; pR++) {
        if (nums[pR] === maximum) {
            freq++;
        }

        while (freq === k) {
            if (nums[pL++] === maximum) {
                freq--;
            }
        }

        count += pL;
    }

    return count;
};
