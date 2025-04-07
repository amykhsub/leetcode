/**
 * Approach: Dynamic Programming with Bit Manipulation
 * 
 * The `mask` represents the possible sums that can be formed using the numbers in the array.
 * If a bit at position `k` is set to 1, it means there is a subset of `nums` that adds up to `k`.
 * 
 * `mask << BigInt(num)` shifts the mask to the left by `num` bits.
 * This represents adding `num` to all the sums that were already represented in the mask.
 * 
 * `mask |= ...` performs a bitwise OR assignment operation to include the new sums that can be formed by adding `num`.
 * 
 * `total >> 1` calculates half of the total sum using a bitwise right shift.
 * `1n << BigInt(...)` creates a BigInt with a single bit set at the position corresponding to half of the total sum.
 * 
 * If `(mask & half)` is greater than 0, it means the bit corresponding to half of the total sum is set in the mask.
 * This indicates that there is a subset of nums that adds up to half of the total sum,
 *  and therefore the array can be partitioned into two equal-sum subsets.
 * 
 * Cons:
 * - The number of elements in the nums array might be limited due to the exponential growth of the bitmask.
 *   If the array is very long, this solution might take a long time to complete or run out of memory.
 * - While it is efficient for some inputs, the bitmask growth can be a serious performance issue for large inputs.
 * 
 * Time: O(n) [pseudo-polynomial], which is the same for both loops.
 * Space: O(1) [pseudo-polynomial], as all variables use constant space.
 */
function canPartition(nums: number[]): boolean {
    const total = nums.reduce((acc, num) => acc + num, 0);

    if (total & 1) return false;

    let mask = 1n;

    for (const num of nums) {
        mask |= mask << BigInt(num);
    }

    const half = 1n << BigInt(total >> 1);

    return (mask & half) > 0;
};
