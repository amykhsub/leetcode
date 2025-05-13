/**
 * Approach: Iterative Transformation Simulation with
 * - Frequency Array
 * - Modulo Arithmetic
 * 
 * `freq` represents frequency counter of lowercase English letters ('a' - 'z') present in input string 's',
 *      where array item id is ASCII code of character.
 *      Constrains allow us to use Uint32Array for better performance due to type specificity and memory optimization.
 *      Avoid the direct string manipulation:
 *      - storing and manipulating rapidly growing string may lead to memory exhaustion (constraint t <= 10^5)
 *      - total time complexity can lead to time out with given constraints.
 *      But with frequency counting we:
 *      - move the count of one character to another one without storing enormous intermediate strings.
 *      - use constant memory
 *      - have more efficient time complexity (O(length of s + t))
 * 
 * Core logic of transformation is simulated with `for` loop that runs `t` times.
 *      Each iteration handles `z` character transformation `fZ = freq[Z_ID]` 
 *          affecting `a` (`freq[0]`) and `b` (`freq[1]`) characters.
 *      Iteration in backward direction (inner `for` loop) 
 *          simulates the shift in alphabet ('a' becomes 'b', 'b' becomes 'c')
 * 
 * Modulo `MOD` is used to prevent overflow.
 * Numeric literals can use underscore ('_') separator to improve readability of large literals (ES2021+):
 *      10^9+7 = 1e9+7 = 1000000007 = 1_000_000_007
 * 
 * Time: O(n + t)
 *      - O(n) for initial frequency counting
 *      - O(t*25) or simple O(t) for transformation loop and inner loop
 * Space: O(1)
 */
function lengthAfterTransformations(s: string, t: number): number {
    const MOD = 1_000_000_007;
    const A_CODE = 'a'.charCodeAt(0);
    const ALPHABET_SIZE = 26;
    const Z_ID = 25;
    let freq: Uint32Array<ArrayBuffer> = new Uint32Array(ALPHABET_SIZE).fill(0);

    for (let i = 0; i < s.length; i++) {
        freq[s[i].charCodeAt(0) - A_CODE]++;
    }

    for (let i = 0; i < t; i++) {
        const fZ = freq[Z_ID];

        for (let i = Z_ID; i > 0; i--) {
            freq[i] = freq[i - 1];
        }

        freq[1] = (freq[1] + fZ) % MOD;
        freq[0] = fZ;
    }

    return freq.reduce((acc, v) => acc + v, 0) % MOD;
};
