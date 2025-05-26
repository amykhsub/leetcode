/**
 * Approach: Frequency Matrix with
 * - Character Code Manipulation
 * - Palindrome Construction
 * - Bit Manipulation with bitwise unsigned right shift (>>>) and bitwise and (&)
 * 
 * Fixed array `freqMatrix` is used for performance and memory efficiency.
 *      It simulates 2D matrix but with flatten array.
 *      The index for a word `[charL, charR]` is calculated as `codeL * ALPHABET_SIZE + codeR`. 
 *          This maps a 2D coordinate (codeL, codeR) to a 1D array index.
 * 
 * Second `for` loop iterates through diagonal of `freqMatrix` (`c * ALPHABET_SIZE + c`) 
 *      to handle words where both characters are the same (e.g., 'aa', 'bb', 'cc').
 *      `count >>> 1` calculates how many pairs of palindromic word can be formed.
 *          E.g. if there are 3 'aa' words, one pair of 'aa' and 'aa' can be formed. 
 *          Each pair adds 4 chars to `palindromeLength` (e.g., 'aa' + 'aa' forms 'aaaa').
 *      Odd number of palindromic word means the word can be used as center of overall palindrome, e.g. 'aabbaa'.
 * 
 * Third `for` loop iterates through upper triangle of `freqMatrix`
 *      `freqMatrix[offset + j]` gets count of words like 'ij'.
 *      `freqMatrix[j * ALPHABET_SIZE + i]` gets count of words like 'ji'. 
 *      Minimum of words count ('ij', 'ji') forms the pairs number. Each pair also adds 4 chars to `palindromeLength`.
 * 
 * Bitwise unsigned right shift (>>>) is used to divide by 2 with floor rounding like Math.floor(count / 2))
 * Bitwise AND (&) is used to check if the number is odd or even. It's better than %2.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function longestPalindrome(words: string[]): number {
    const A_CODE = 97;
    const ALPHABET_SIZE = 26;
    const freqMatrix = new Uint32Array(ALPHABET_SIZE * ALPHABET_SIZE);

    for (const word of words) {
        const codeL = word.charCodeAt(0) - A_CODE;
        const codeR = word.charCodeAt(1) - A_CODE;
        freqMatrix[codeL * ALPHABET_SIZE + codeR]++;
    }

    let palindromeLength = 0;
    let foundCenterElement = false;

    for (let c = 0; c < ALPHABET_SIZE; c++) {
        const count = freqMatrix[c * ALPHABET_SIZE + c];
        const pairCount = count >>> 1;
        palindromeLength += pairCount * 4;

        if ((count & 1) === 1) {
            foundCenterElement = true;
        }
    }

    for (let i = 0; i < ALPHABET_SIZE; i++) {
        const offset = i * ALPHABET_SIZE;

        for (let j = i + 1; j < ALPHABET_SIZE; j++) {
            const forwardCount = freqMatrix[offset + j];
            const backwardCount = freqMatrix[j * ALPHABET_SIZE + i];

            palindromeLength += (forwardCount < backwardCount ? forwardCount : backwardCount) * 4;
        }
    }

    return palindromeLength + (foundCenterElement ? 2 : 0);
};
