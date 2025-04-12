/**
 * Approach: Enumeration with
 * - Palindrome generation by taking number, converting to string and concatenating reversed part (String Manipulation)
 * - Divisibility check using Reminder operator ('%').
 * - Hash Set for uniqueness to ensure that only unique palindromes are counted.
 * - Frequency counting (HashMap) for each digit in palindrome.
 * - Permutation:
 * -- factorials are precomputed up to `n` and stored in array. 
 * -- handling zeros in palindrome
 * 
 * `const skip = n % 2` prevents the middle digit of palindrome from being duplicated
 *  if palindrome has odd length.
 * 
 * The range of loop for palindrome calculation:
 * The code generates the first half (or the first half plus the middle digit if `n` is odd) of palindrome.
 * `n-1` - we're interested in the length of the first half (or the first half minus the middle digit).
 * Bitwise right shift `>> 1` is equivalent to integer division by 2 with rounding (truncation).
 * E.g. for integers `n` [1,2,3,4,5,6,7,8,9,10] 
 *           we have `i` [0,0,1,1,2,2,3,3,4,4]
 * So,
 * `10 ** ((n - 1) >> 1)` calculates the smallest number which has n/2 number of digits.
 * `i * 10` calculates the next power of 10 which is out of the first half of the palindrome.
 * E.g.:
 * - for palindrome length `n` = 3 or 4, the loop iterates the range [>=10, <100]
 * - for palindrome length `n` = 5 or 6, the loop iterates the range [>=100, <1000]
 * 
 * Optimizations:
 * - The code iterates through a range of numbers `i` that represent the first half of the palindrome.
 * - early exit from iteration for non-devisable by `k` palindromes.
 * - prevented permutations calculations for the same palindromes (same digit composition).
 * 
 * Time: O(1e(n/2) + n*log(n)), because:
 *      - loop from `i` to `end` takes O(10**(n/2))
 *      - sort digits for palindrome inside the loop takes O(n * log(n))
 * Space: O(n * 1e(n/2)), because `hash` stores up to `10**(n/2)` palindromes of length `n`
 */
function countGoodIntegers(n: number, k: number): number {
    const fact: number[] = [1];

    for (let i = 1; i <= n; i++) {
        fact[i] = fact[i - 1] * i;
    };

    const skip = n % 2;
    const hash = new Set<string>();
    let result = 0;

    let i = 10 ** ((n - 1) >> 1);
    const end = i * 10;

    for (; i < end; i++) {
        const numStr = i.toString();
        const pal: string = numStr + numStr.split('').reverse().slice(skip).join('');

        if (Number(pal) % k) {
            continue;
        }

        const sorted = pal.split('').sort().join('');

        if (hash.has(sorted)) {
            continue;
        }

        hash.add(sorted);

        const freqMap = new Map<string, number>();

        for (const d of pal) {
            freqMap.set(d, (freqMap.get(d) ?? 0) + 1);
        }

        const nonZeroQty = n - (pal.match(/0/g)?.length ?? 0);
        let perms = nonZeroQty * fact[n - 1];

        for (const f of freqMap.values()) {
            perms /= fact[f];
        }

        result += perms;
    }

    return result;
};
