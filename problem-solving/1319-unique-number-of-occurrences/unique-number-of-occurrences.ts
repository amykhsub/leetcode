/**
 * Approach: Hash Map and Set Data Structure
 * 
 * Hash Map `freq` is used to count occurrences of each element in input array (Frequency Counting).
 * Set Data Structure `unique` is used to count unique values of occurrences because Set stores only unique values.
 * 
 * Time: O(n)
 * Space: O(n)
 */
function uniqueOccurrences(arr: number[]): boolean {
    const freq = new Map<number, number>();

    for (const a of arr) {
        freq.set(a, (freq.get(a) ?? 0) + 1);
    }

    const unique = new Set<number>(freq.values());

    return freq.size === unique.size;
};
