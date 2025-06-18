/**
 * Approach: Greedy with Sorting 
 * 
 * Greedy approach creates groups of three smallest elements from sorted array.
 * Uint32Array is used for sorting performance optimization.
 * 
 * Time: O(n*log(n)) because of sorting
 * Space: O(n)
 */
function divideArray(nums: number[], k: number): number[][] {
    const n = nums.length;
    const sorted = Uint32Array.from(nums).sort();
    const res: number[][] = [];

    for (let i = 2; i < n; i += 3) {
        if (k < sorted[i] - sorted[i - 2]) {
            return [];
        }

        res.push([sorted[i], sorted[i - 1], sorted[i - 2]]);
    }

    return res;
};
