/**
 * Approach: Enumeration with
 * - Bitwise AND for check if value is odd or even
 * - Bitwise Right Shift to get half of value
 * - Two Pointers to reduce the number of iterations through stringified number
 * 
 * Early exit and skip iterations:
 * - For numbers less than 100, only possible symmetric numbers are devisable by 11.
 *     And we can skip other iterations up to the next number devisable by 11.
 * - For stringified number with odd length we can skip iterations up to the next number with even length.
 *     E.g. for 100, 101, 102 ... 999 we can jump to 1001.
 *     The same for 10000...99999 if constrains will be changed.
 * 
 * Time: O(n), where `n` is a length of range [low, high]
 * Space: O(1)
 */
function countSymmetricIntegers(low: number, high: number): number {
    let count = 0;

    for (let n = low; n <= high; n++) {
        if (n < 100) {
            const reminder = n % 11;

            if (!reminder) {
                count++;
            }

            n += 10 - reminder;
            continue;
        }

        const nStr = String(n);
        const nStrLen = nStr.length;

        if (nStrLen & 1) {
            n = 10 ** nStrLen;
            continue;
        }

        const half = nStrLen >> 1;
        let balancer = 0;

        for (let i = 0; i < half; i++) {
            balancer += Number(nStr[i]);
            balancer -= Number(nStr.at(-i - 1));
        }

        if (!balancer) {
            count++;
            n++;
        }
    }

    return count;
};
