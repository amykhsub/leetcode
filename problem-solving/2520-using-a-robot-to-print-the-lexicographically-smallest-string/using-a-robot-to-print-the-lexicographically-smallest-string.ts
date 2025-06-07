/**
 * Approach: Greedy with
 * - Frequency Counting
 * - Stack Data Structure
 * - TextDecoder
 * 
 * The core idea to try to append the smallest possible character to the paper.
 *      And on each step we need to decide whether to take a character from `s` string and put it on stack 
 *      or to take a character from stack and put it on paper. 
 *      The greedy choice is to always pick the smallest available character.
 * 
 * `freq` typed array is used to count frequency of each character in string `s`.
 * `minCharN` keeps the smallest character (represented by code)
 * `stack` is used to simulate robot's temporary string `t`, and character from 's' is pushed to this stack.
 * `p` is the pointer of stack to indicate the top of the stack.
 * 
 * `outputCharCodes` is used to store ASCII codes of characters for the final output string. 
 *      This is more efficient than concatenating strings.
 * `outputNextP` is a pointer to track the next available position in `outputCharCodes` typed array.
 * 
 * `TextDecoder` is used to convert collected ASCII codes (outputCharCodes) to string. This is more performant,
 *      than `String.fromCharCode()`
 * 
 * Time: O(n)
 *      - frequency array costs O(n)
 *      - minCharN initialization O(1)
 *      - main loop: `for` costs O(n) + `while` costs O(1) = O(n)
 *      - final while costs O(n)
 *      - TextDecoder converts array of characters and take proportional time to `outputCharCodes`, which is `n`
 * Space: O(n)
 */
function robotWithString(s: string): string {
    const ALPHABET_SIZE = 26;
    const A_CODE = 'a'.charCodeAt(0);
    const n = s.length;
    const freq = new Uint32Array(ALPHABET_SIZE);

    for (let i = 0; i < n; i++) {
        const charN = s.charCodeAt(i) - A_CODE;

        freq[charN]++;
    }

    let minCharN = 0;

    while (minCharN < ALPHABET_SIZE && freq[minCharN] === 0) {
        minCharN++;
    }

    const stack = new Uint8Array(n);
    const outputCharCodes = new Uint8Array(n);
    let p = -1;
    let outputNextP = 0;

    for (let i = 0; i < n; i++) {
        const charN = s.charCodeAt(i) - A_CODE;
        const remainingCount = --freq[charN];

        if (charN === minCharN && remainingCount === 0) {
            minCharN++;

            while (minCharN < ALPHABET_SIZE && freq[minCharN] === 0) {
                minCharN++;
            }
        }

        stack[++p] = charN;

        while (p >= 0 && (minCharN === ALPHABET_SIZE || stack[p] <= minCharN)) {
            outputCharCodes[outputNextP++] = stack[p--] + A_CODE;
        }
    }

    while (p >= 0) {
        outputCharCodes[outputNextP++] = stack[p--] + A_CODE;
    }

    const textDecoder = new TextDecoder();

    return textDecoder.decode(outputCharCodes);
}
