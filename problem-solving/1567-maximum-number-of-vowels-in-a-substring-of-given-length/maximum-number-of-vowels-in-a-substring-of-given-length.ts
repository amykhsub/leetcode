/**
 * Approach: Sliding Window with Early Exit
 * 
 * Initially solution counts the frequency of vowels in window of length `k`.
 *      Then it updates the vowel count for current window without recalculating it each time.
 * 
 * `Set` is used for fast vowel checking
 * 
 * Time: O(n)
 * Space: O(1)
 */
function maxVowels(s: string, k: number): number {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    let max = 0;

    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) {
            count++;
        }
    }

    if (count === k) {
        return k;
    }

    max = count;

    for (let i = k; i < s.length; i++) {
        if (vowels.has(s[i])) {
            count++;
        }

        if (vowels.has(s[i - k])) {
            count--;
        }

        if (count === k) {
            return count;
        }

        max = Math.max(max, count);
    }

    return max;
};
