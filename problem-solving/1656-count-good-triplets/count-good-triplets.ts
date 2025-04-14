/**
 * Approach: Enumeration with
 * - Cumulative Sum (Prefix Sum)
 * - Range Calculation
 * 
 * By using the prefix sum array, the solution avoids iterating through the entire `arr` array 
 * for each pair (`arr[j]`, `arr[k]`) to count valid `arr[i]` values.
 * 
 * Instead of iterating through all possible indexes of `i`, for each `j` and `k`, 
 * it uses the prefix sum array to get the count of the indexes that would satisfy the conditions, in constant time.
 * 
 * Time: O(n²), where `n` is the length of array, due to nested loop. 
 *       The inner loop updating the `sum` array is O(n∗1) = O(n) which is less than O(n²).
 * Space: O(1)
 */
function countGoodTriplets(arr: number[], a: number, b: number, c: number): number {
    let ans = 0;
    const n = arr.length;
    const sum = new Array(1001).fill(0);

    for (let j = 0; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
            if (Math.abs(arr[j] - arr[k]) <= b) {
                const l = Math.max(0, Math.max(arr[j] - a, arr[k] - c));
                const r = Math.min(1000, Math.min(arr[j] + a, arr[k] + c));

                if (l <= r) {
                    ans += sum[r];

                    if (l) {
                        ans -= sum[l - 1];
                    }
                }
            }
        }

        for (let k = arr[j]; k < 1001; k++) {
            sum[k]++;
        }
    }

    return ans;
};
