/**
 * Approach: Bit Manipulation, Bitmask
 * 
 * `1n << BigInt(num)` creates BigInt with a single bit set at the position `num`.
 * `mask & bit` returns true if the bit is already set in the mask.
 * `mask |= bit` performs a bitwise OR assignment operation to include a bit. * 
 * 
 * Time: O(n), where `n` is nums.length
 * Space: O(1) [pseudo-polynomial]
 */
function minOperations(nums: number[], k: number): number {
    let mask = 0n;
    let count = 0;

    for (const num of nums) {
        if (num > k) {
            const bit = 1n << BigInt(num);

            if (!(mask & bit)) {
                count++;
                mask |= bit;
            }
            
            continue;
        }

        if (num < k) {
            return -1;
        }
    }

    return count;
};
