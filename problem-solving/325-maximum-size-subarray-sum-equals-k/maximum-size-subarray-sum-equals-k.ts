/**
 * Approach: Prefix Sum with
 * - Hash Map
 * - Include-Exclude
 * 
 * The core idea is to calculate the sum (`prefixSum`) of all numbers before current `num[i]`
 *      and store it current index using Hash Map `prefixSumMap`.
 *      `prefixSum` is stored only once because we interested to keep the smallest index to get the largest subarray.
 * 
 * If the current prefix sum itself equals `k`, 
 *      it means the subarray from the beginning of array up to the current index has a sum of `k`.
 *      So, it's currently the longest subarray.
 * 
 * According to Include-Exclude technique, for `j <= i`:
 *      prefixSum[i] - prefixSum[j - 1] = k
 *      or
 *      prefixSum[i] - k = prefixSum[j - 1]
 * 
 * If `diff` exists in prefixSumMap, it means we've encountered a prefix sum earlier, 
 *      so the subarray between earlier index and the current index has a sum of `k`.
 * 
 * Time: O(n) because of single `for` loop
 * Space: O(n) for `prefixSumMap`
 */
function maxSubArrayLen(nums: number[], k: number): number {
    const prefixSumMap = new Map<number, number>();
    let maxLength = 0;
    let prefixSum = 0;

    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];

        if (prefixSum === k) {
            maxLength = i + 1;
        }

        const diff = prefixSum - k;

        if (prefixSumMap.has(diff)) {
            maxLength = Math.max(maxLength, i - prefixSumMap.get(diff)!);
        }

        if (!prefixSumMap.has(prefixSum)) {
            prefixSumMap.set(prefixSum, i);
        }
    }

    return maxLength;
};
