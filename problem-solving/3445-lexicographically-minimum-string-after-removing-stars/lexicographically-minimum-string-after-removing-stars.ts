/**
 * Approach: Greedy with Efficient Data Structures
 * 
 * At each step the solution makes a decision about which character to remove 
 *      to minimize the string of result lexicographically.
 *      It makes the locally optimal choice -- it deletes the smallest character (non-'') to its left '*'.
 *      By always removing the smallest possible character, 
 *          we maximize the chance of keeping larger characters earlier in the string.
 * 
 * `deletions` typed array allows 2-path approach:
 *      - to mark (like boolean flag) characters for removal based on greedy strategy
 *      - to construct the final string by including non-deleted characters and to avoid in-place string manipulations.
 * `charBucketHeads` and `nextIds` are simulated linked lists. They are used to maintain a list of indices 
 *      where each character ('a'-'z') appears in the string and has not yet been deleted.
 *      `charBucketHeads[bucketId]` stores the index of most recently encountered character of that type (bucketId). 
 *          This creates linked lists for each character type.
 *      `nextIds[i]` stores the index of previous character of the same type as `s[i]`. 
 *          This is 'next' pointer in the linked list.
 *      When non-star character `s[i]` is encountered, its index `i` is added to the front of linked list 
 *          of its character bucket. `charBucketHeads[bucketId]` points to `i`, and `nextIds[i]` points 
 *          to the previous head of that bucket. 
 *          This means `charBucketHeads[bucketId]` always show the rightmost (latest encountered) character 
 *              (of that type) that hasn't been deleted yet.
 * 
 * `bitmask` is used to find the smallest available character. Each bit corresponds to character ('a'-'z').
 *      If the `k`-th bit is set, it means there's at least one undeleted character of type `k`.
 *      `lowestSet = bitmask & -bitmask` isolates the lowest (rightmost) set bit in bitmask, 
 *          which corresponds to smallest character that is currently available in any bucket.
 *      `Math.clz32` (Count Leading Zeros 32-bit) returns the number of leading zero bits 
 *          in binary representation of 32-bit integer. By subtracting this from 31, 
 *          we get 0-indexed position of the most significant (leftmost) set bit, 
 *          which corresponds to the `smallestBucket` ID.
 * 
 * `charBucketHeads[smallestBucket] = nextIds[removedChar]` - when `removeChar` is marked for deletion, 
 *      it's removed from its bucket's linked list. `removeChar` is not the most recent in bucket any more.
 *      `charBucketHeads[smallestBucket] === -1` means the bucket is empty.
 *      `bitmask ^= lowestSet` is used to delete the bucket from `bitmask`
 * 
 * Time: O(n)
 * Space: O(n)
 */
function clearStars(s: string): string {
    const ALPHABET_SIZE = 26;
    const A_CODE = 'a'.charCodeAt(0);
    const STAR_CODE = '*'.charCodeAt(0);
    const n = s.length;
    const deletions = new Uint8Array(n);
    const charBucketHeads = new Int32Array(ALPHABET_SIZE).fill(-1);
    const nextIds = new Int32Array(n);
    let bitmask = 0;
    let starCount = 0;

    for (let i = 0; i < n; i++) {
        const iCode = s.charCodeAt(i);

        if (iCode === STAR_CODE) {
            deletions[i] = 1;
            starCount++;

            const lowestSet = bitmask & -bitmask;
            const smallestBucket = 31 - Math.clz32(lowestSet);
            const removedChar = charBucketHeads[smallestBucket];

            deletions[removedChar] = 1;
            charBucketHeads[smallestBucket] = nextIds[removedChar];

            if (charBucketHeads[smallestBucket] === -1) {
                bitmask ^= lowestSet;
            }
        } else {
            const bucketId = iCode - A_CODE;

            nextIds[i] = charBucketHeads[bucketId];
            charBucketHeads[bucketId] = i;
            bitmask |= (1 << bucketId);
        }
    }

    const m = n - 2 * starCount;
    const clearedChars: string[] = new Array<string>(m);
    let w = 0;

    for (let i = 0; i < n; i++) {
        if (deletions[i] === 0) {
            clearedChars[w++] = s[i];
        }
    }

    return clearedChars.join('');
}
