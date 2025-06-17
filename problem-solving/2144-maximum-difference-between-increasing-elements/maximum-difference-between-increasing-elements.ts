/**
 * Approach: Single-Pass
 * 
 * `min` tracks the the smallest number. `nums[i]` should be as small as possible to maximize `nums[j] - nums[i]`
 * 
 * Time: O(n)
 * Space: O(1)
 */
function maximumDifference(nums: number[]): number {
    const n = nums.length;
    let min = nums[0];
    let maxDiff = -1;

    for (let i = 0; i < n; i++) {
        const num = nums[i];

        if (num > min) {
            const diff = num - min;

            if (diff > maxDiff) {
                maxDiff = diff;
            }
        } else if (num < min) {
            min = num;
        }
    }

    return maxDiff;
};
