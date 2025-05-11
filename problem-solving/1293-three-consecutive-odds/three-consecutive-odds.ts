/**
 * Approach: Declarative with
 * - Reminder (%)
 * - Product of Numbers
 * 
 * Product of numbers is even if at least one of them is even.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function threeConsecutiveOdds(arr: number[]): boolean {
    return arr.some((val, i) => {
        if (val % 2 === 0) {
            return false;
        }

        return arr[i + 1] * arr[i + 2] % 2;
    });
};
