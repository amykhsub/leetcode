/**
 * Approach: Frequency Array Map with Bit Manipulation using Bitmask and Bitwise Operators
 * 
 * Early exit:
 * - if strings have different length they are not close
 * - if strings use different set of characters they are not close
 * 
 * English alphabet has 26 lowercase characters. 
 * So, Frequency Maps that are used to count each character appearance have static length with pre-filled value 0
 * 
 * Bitmasks are used to track the presence of characters in each word.
 * Bitwise left shift operator ('<<') shifts 1 to x position, where x is a charCode - 97
 * E.g. 'a' -> ...000001, 'b' -> ...000010, 'c' -> ...000100
 * Bitwise OR assignment operator accumulates all characters of word with bitmask.
 * If the bitmasks are different, it means the strings contain different sets of characters.
 * 
 * By sorting the frequency arrays, we can compare the frequency distributions of the two strings 
 * without considering the actual characters.
 * Type of ordering doesn't matter in this case if it's the same for both arrays.
 * It's alphabetic for numbers in the solution. 
 * But it gives the same order of values, which does matter to check whether the strings can be transformed. 
 * 
 * If any corresponding elements are different in the sorted frequency arrays, 
 * it means the frequency distributions are different, and the strings are not close.
 * 
 * Time: O(n), where n is the length of word
 * Space: O(1), as frequency arrays, bitmasks, and other variables have constant size.
 */
const aCode = 'a'.charCodeAt(0);
const lowEnCharsNum = 26;

function closeStrings(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) return false;

    const freq1 = Array<number>(lowEnCharsNum).fill(0);
    const freq2 = Array<number>(lowEnCharsNum).fill(0);
    let bitMask1 = 0;
    let bitMask2 = 0;

    for (let i = 0, c1: number, c2: number; i < word1.length; i++) {
        c1 = word1.charCodeAt(i) - aCode;
        c2 = word2.charCodeAt(i) - aCode;
        freq1[c1]++;
        freq2[c2]++;
        bitMask1 |= 1 << c1; 
        bitMask2 |= 1 << c2;
    }

    if (bitMask1 !== bitMask2) return false;
    
    // 
    freq1.sort();
    freq2.sort();

    for (let i = 0; i < lowEnCharsNum; i++) {
        if (freq1[i] !== freq2[i]) return false;
    }

    return true;
};
