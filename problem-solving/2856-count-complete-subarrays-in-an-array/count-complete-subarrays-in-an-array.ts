/**
 * Approach: Sliding Window with
 * - Frequency Map (Hash Map)
 * - Greedy
 * 
 * The core of solution is to use 2 pointers `pL` and `pR` which define a "window".
 * The right pointer `pR` expands the window to the right. 
 * The left pointer `pL` contracts the window from the left when a "complete" subarray is found.
 * 
 * Frequency Map `freqMap` tracks the count of each element within the current window.
 * 
 * When a "complete" subarray is found, any subarray extending from `pR` to the end of the array 
 *      will also be "complete", because it will still contain all the distinct elements.
 * 
 * Time: O(n) because of single pass through the array by both `pR` and `pL`
 * Space: O(n) for frequency map
 */
function countCompleteSubarrays(nums: number[]): number {
    const n = nums.length;
    const distItemCount: number = new Set(nums).size;
    const freqMap = new Map<number, number>();
    let subArrCount = 0;
    let pL = 0;

    for (let pR = 0; pR < n; pR++) {
        freqMap.set(nums[pR], (freqMap.get(nums[pR]) ?? 0) + 1);

        while (freqMap.size === distItemCount) {
            subArrCount += n - pR;
            freqMap.set(nums[pL], freqMap.get(nums[pL])! - 1);

            if (freqMap.get(nums[pL]) === 0) {
                freqMap.delete(nums[pL]);
            }

            pL++;
        }
    }

    return subArrCount;
};
