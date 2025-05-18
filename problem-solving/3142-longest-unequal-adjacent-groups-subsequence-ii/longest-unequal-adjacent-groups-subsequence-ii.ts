/**
 * Approach: Dynamic Programming (Bottom-Up) with
 * - Bit Manipulation with Bitwise XOR (^), Bitwise OR and assign (|=), Left shift (<<)
 * - Hamming Distance
 * - Hash Map
 * 
 * `dp[i]` stores the length of the longest valid subsequence that starts at index `i`.
 * Backward iteration allows to build the lengths of subsequences based on already computed values for later indices.
 * For each word `i` we try to extend subsequence by looking at subsequent words (indices > `i`)
 *      using `maxLength` to track the longest length.
 * `nextWordIndices` array stores an index of the next word in the longest subsequence
 *      that is used for reconstruction of subsequence once the start of the subsequence is found.
 * 
 * Unique bitmask `wordMask` is created to encode each word. It represents concatenated 5-bit masks of each character.
 * 
 * ? why bigint is used for mask
 *      Each character of word is encoded.
 *      26 possible lowercase English letters and 5 bits are sufficient for each character (2^5 = 32 > 26).
 *      For example, if word has a length of 7 it requires 5x7 = 35 bits.
 *      If word is long, total number of bits can exceed the maximum safe integer (2^53-1).
 * 
 * `oneCharDiffMask` is created by flipping the bits corresponding to the character at current position. 
 *      This represents all possible words that differ by 1 character at that position.
 * 
 * The bitmasking allows to group and look up words that are at Hamming distance of 1 from the current word.
 * 
 * Hash Map `maskMap` is used to store `oneCharDiffMask` as key and list of indices of words 
 *      from which the mask can be produced.
 *      If the mask exists in map, it means there're other words in the `words` 
 *          that at Hamming distance of 1 from current word. So we can check 
 *          if some of the indices can be used to extend current subsequence.
 * 
 * `bestStartIndex` variable keeps track of index that starts the overall longest subsequence.
 * 
 * Time: O(n*L²) where `L` is the length of the longest word
 *      - outer loop `for` iterates `n` times
 *      - inner loop for Hamming mutation iterates `L` times
 *      - bitmask generation for each word takes time proportional to `L`
 *      - word insertion into `maskMap` also takes time proportional to `L`
 *      - nested loop is dominant factor involving word length and number of candidates 
 * Space: O(n*L):
 *      - `nextWordIndices` and `dp` take `n` space
 *      - `maskMap` takes `n*L` space 
 */
function getWordsInLongestSubsequence(words: string[], groups: number[]): string[] {
    const A_CODE = 97;
    const itemCount = words.length;
    const nextWordIndices = new Uint16Array(itemCount).fill(itemCount);
    const dp = new Uint16Array(itemCount).fill(1);
    const maskMap = new Map<bigint, number[]>();
    let bestStartIndex = 0;

    for (let i = itemCount - 1; i >= 0; i--) {
        const word = words[i];
        const wordLength = word.length;
        const charMasks = new Array<bigint>(wordLength).fill(BigInt(0));
        let wordMask = BigInt(0);

        for (let j = 0; j < wordLength; j++) {
            const charMask = BigInt(word.charCodeAt(j) - A_CODE + 1) << BigInt(5 * j);

            charMasks[j] = charMask;
            wordMask |= charMask;
        }

        let maxLength = 1;
        let nextWordIndex = itemCount;

        for (let j = 0; j < wordLength; j++) {
            const oneCharDiffMask: bigint = wordMask ^ charMasks[j];

            if (maskMap.has(oneCharDiffMask)) {
                const candidates: number[] = maskMap.get(oneCharDiffMask)!;

                for (const candidate of candidates) {
                    const extender = dp[candidate] + 1;

                    if (groups[i] !== groups[candidate] && extender > maxLength) {
                        maxLength = extender;
                        nextWordIndex = candidate;
                    }
                }
            }
        }

        dp[i] = maxLength;
        nextWordIndices[i] = nextWordIndex;

        if (dp[i] > dp[bestStartIndex]) {
            bestStartIndex = i;
        }

        for (let j = 0; j < wordLength; j++) {
            const oneCharDiffMask: bigint = wordMask ^ charMasks[j];

            if (!maskMap.has(oneCharDiffMask)) {
                maskMap.set(oneCharDiffMask, []);
            }

            maskMap.get(oneCharDiffMask)!.push(i);
        }
    }

    const result: string[] = [];

    for (let i = bestStartIndex; i < itemCount; i = nextWordIndices[i]) {
        result.push(words[i]);
    }

    return result;
}
