/**
 * Approach: Binary Indexed Tree (BIT) / Fenwick Tree
 * 
 * Binary Indexed Tree solution with index mappings determines the relative positions of elements in `nums1` 
 *      within `nums2`, allowing it to count the good triplets without brute-force comparisons.
 * 
 * BIT indices are 1-based.
 * 
 * Binary Indexed Tree functions:
 * - `incrementBIT(index)`: updates current and all necessary parent nodes to maintain the BIT's prefix sum properties.
 *      `index += index & -index`: to move to the next ancestor
 * - `getPrefixSum(index)`: calculates the sum of all elements in the BIT up to `index`.
 * 
 * Counting Good Triplets:
 * - `left`: the number of elements in `nums2` that appear before `nums1[i]` 
 *      and are also smaller than `nums1[i]` in nums1.
 * - `right`: the number of elements in `nums2` that appear after `nums1[i]` 
 *      and are also larger than `nums1[i]` in `nums1`:
 *      `n - 1 - nums2Idx` gives the total number of elements to the right of `nums2Idx` in `nums2`.
 *      `i - left` gives the amount of numbers that are smaller than `nums1[i]` that have been processed so far.
 * - `incrementBIT(nums2Idx)`: update the BIT to reflect that `nums2Idx` has been processed.
 * 
 * Binary Indexed Tree problem list https://leetcode.com/tag/binary-indexed-tree/
 * BIT wiki https://en.wikipedia.org/wiki/Fenwick_tree
 * #308 https://leetcode.com/problems/range-sum-query-2d-mutable/editorial/ has detailed explanation of BIT solution.
 * 
 * Time: O(n*log(n)), because `incrementBIT` and `getPrefixSum` take O(log(n)) inside `for` loop
 * Space: O(n)
 */
function goodTriplets(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    const treeLength = n + 1;
    const binaryIndexedTree = new Array<number>(treeLength).fill(0);

    function incrementBIT(index: number): void {
        index++;

        while (index < treeLength) {
            binaryIndexedTree[index]++;
            index += index & -index;
        }
    }

    function getPrefixSum(index: number): number {
        index++;

        let count = 0;

        while (index > 0) {
            count += binaryIndexedTree[index];
            index -= index & -index;
        }

        return count;
    }

    const nums2Indices = new Array<number>(n);
    const nums1PositionInNums2 = new Array<number>(n);

    for (let i = 0; i < n; i++) {
        nums2Indices[nums2[i]] = i;
    }

    for (let i = 0; i < n; i++) {
        nums1PositionInNums2[nums2Indices[nums1[i]]] = i;
    }

    let count = 0;

    for (let i = 0; i < n; i++) {
        const nums2Idx = nums1PositionInNums2[i];
        const left = getPrefixSum(nums2Idx);
        const right = (n - 1 - nums2Idx) - (i - left);

        count += left * right;
        incrementBIT(nums2Idx);
    }

    return count;
};
