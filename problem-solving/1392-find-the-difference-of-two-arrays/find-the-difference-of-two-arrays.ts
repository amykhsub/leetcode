/**
 * Approach: Set with imperative filter
 * 
 * `Set` object stores unique values only that allows to get distinct integers.
 * Imperative filtering (`for` loop) of opposite sets gives the difference between arrays of integers.
 * `Set.prototype.difference()` is available for new versions of browsers (June 2024)
 * 
 * Time: O(n)
 * Space: O(n)
 */
function findDifference(nums1: number[], nums2: number[]): number[][] {
    const set1 = new Set<number>(nums1);
    const set2 = new Set<number>(nums2);
    const answer: number[][] = [[], []];

    for (const num of set1) {
        if (!set2.has(num)) answer[0].push(num);
    }

    for (const num of set2) {
        if (!set1.has(num)) answer[1].push(num);
    }

    return answer;
};
