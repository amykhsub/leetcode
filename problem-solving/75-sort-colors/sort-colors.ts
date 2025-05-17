/**
 * Approach: Count and Array.prototype.fill
 * 
 * `freq` typed array counts occurrences of each color in `nums`.
 * `freq` keys represent color and `freq` values represent the length of each colored part of sorted `nums`.
 * We fill out all colored parts of `nums` using Array.prototype.fill.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function sortColors(nums: number[]): void {
    const freq = new Uint8Array(3).fill(0);

    for (const num of nums) {
        freq[num]++;
    }

    const midEnd = freq[0] + freq[1];

    nums.fill(0, 0, freq[0]);
    nums.fill(1, freq[0], midEnd);
    nums.fill(2, midEnd);
};
