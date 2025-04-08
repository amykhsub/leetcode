/**
 * Approach:
 * - Bit Manipulation with Bitmask
 * - Reverse Traversal (Backward)
 * - bitwise left shift, bitwise right shift, bitwise OR (with assignment), bitwise AND
 * 
 * `1n << BigInt(num)` creates BigInt with a single bit set at the position `num`.
 * `mask & bit` returns true if the bit is already set in the mask.
 * `x >> 0` truncates a floating point number to an integer. Use Math.trunc() for large number.
 * `mask |= bit` performs a bitwise OR assignment operation to include a bit.
 * 
 * Time: O(n) [pseudo-polynomial], where n is the length of nums.
 * Space: O(1) [pseudo-polynomial], as all variable use constant space.
 */
function minimumOperations(nums: number[]): number {
    let mask = BigInt(0);

    for (let i = nums.length - 1; i >= 0; i--) {
        const bit = 1n << BigInt(nums[i]);

        if (mask & bit) {
            return (i / 3 >> 0) + 1;
        }

        mask |= bit;
    }

    return 0;
};
