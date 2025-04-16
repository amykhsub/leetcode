/**
 * Approach: Sliding Window (Two Pointers) with Frequency Map (HashMap)
 * 
 * The core of the solution is a sliding window defined by left and right pointers.
 * It counts good pairs without nested loops of O(n²) complexity.
 * 
 * Frequency Map (HashMap) stores the frequency of each number encountered within current window.
 * 
 * Extending the window (`right` pointer) to find a window with `k` number of pairs.
 * 
 * `while (pairsCount >= k)`    when window has number pairs enough to be 'good' subarray,
 *     `result += n - right`    all subarrays starting from left up to and including right are also 'good'
 * 
 * Shrinking the window (left pointer) to find smallest window that meets the criteria, 
 *      accumulating the number of valid windows that end at the current `right` index.
 * 
 * Time: O(n) because pointers of window iterate through `nums` array once.
 * Space: O(n) for frequency map.
 */
function countGood(nums: number[], k: number): number {
    const n = nums.length;
    const freqMap = new Map<number, number>();
    let result = 0;
    let pairsCount = 0;

    for (let right = 0, left = 0; right < n; right++) {
        const numR = nums[right];
        const fR = freqMap.get(numR) ?? 0;

        pairsCount += fR;
        freqMap.set(numR, fR + 1);

        while (pairsCount >= k) {
            result += n - right;

            const numL = nums[left++];
            const fL = freqMap.get(numL)! - 1;

            pairsCount -= fL;
            freqMap.set(numL, fL);
        }
    }

    return result;
};
