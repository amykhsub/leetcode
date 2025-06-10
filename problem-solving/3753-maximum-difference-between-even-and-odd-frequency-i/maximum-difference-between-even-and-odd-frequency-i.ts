/**
 * Approach: Frequency Counting with
 * - Bit Manipulation with Bitwise AND (&)
 * 
 * English alphabet has 26 lowercase characters.
 * `freq` typed array is used to count frequency of each character in string `s`.
 * 
 * `Uint8Array` is a typed array that stores 8-bit unsigned integers, 
 *      which is memory-efficient for small integer states (up to 100 in our case).
 * 
 * Bitwise AND (&) is used to check if the number is odd or even. It's better than %2.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function maxDifference(s: string): number {
    const ALPHABET_SIZE = 26;
    const A_CODE = 'a'.charCodeAt(0);
    const freq = new Uint8Array(ALPHABET_SIZE).fill(0);

    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - A_CODE]++;
    }

    let evenMin = 100;
    let oddMax = 0;

    for (let i = 0; i < ALPHABET_SIZE; i++) {
        const f = freq[i];

        if (f === 0) {
            continue;
        }

        if ((f & 1) === 0) {
            if (f < evenMin) {
                evenMin = f;
            }
        } else {
            if (f > oddMax) {
                oddMax = f;
            }
        }
    }

    return oddMax - evenMin;
};
