/**
 * Approach: Iterative Generation with
 * - Bitwise Manipulation (Unsigned right shift >>>)
 * 
 * The core idea to generate the numbers directly in lexicographical order 
 *      instead of generating all numbers from 1 to `n` and then sorting them.
 * 
 * This solution mimics depth-first traversal of 'lexicographical tree' 
 *      where children are formed by appending digits (0-9).
 *      `if/else` and `if/while` conditions handle moving down a branch, moving across siblings, 
 *          and moving back up to the parent to find the next sibling when a branch is exhausted or exceeds `n`.
 * 
 * Unsigned right shift (>>>) truncates the number to a 32-bit unsigned integer.
 * 
 * Time: O(n)
 * Space: O(1) because the final output array is excluded from the final space calculation
 */
function lexicalOrder(n: number): number[] {
    const result: number[] = new Array(n);
    let current = 1;

    for (let i = 0; i < n; i++) {
        result[i] = current;

        if (current * 10 <= n) {
            current *= 10;
            continue;
        }

        if (current >= n) {
            current = current / 10 >>> 0;
        }

        current += 1;

        while (current % 10 === 0) {
            current = current / 10 >>> 0;
        }
    }

    return result;
}