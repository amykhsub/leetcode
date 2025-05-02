/**
 * Approach: Two Pointers
 * 
 * Pointer `pL` keeps index of previous "R" or "L".
 * 
 * Pointer `pR` iterates through `dominoes` from left to right.
 *      - if current push (`dominoes[pR]`) is 'R' and previous push (`pL`) was 'R', 
 *          then all '.' dominoes between `pL` and current `pR` will also be pushed to the right.
 *      - if current push is 'L' and there was no push before or previous push was 'L',
 *          then all '.' dominoes from the beginning (0) or from previous 'L' (`pL`) to the current 'L' (`pR`) 
 *              will be pushed to the left.
 *      - if current push is 'L' and previous push (`pL`) was 'R', and current push is 'L' (`pR`), 
 *          the dominoes between them experience forces from both sides.
 *          `l === r` after the loop means there was odd number of '.' dominoes between 'R' and 'L'
 *      - and current index `pR` becomes the new last known 'L'/'R' position (`pL = pR`).
 *      - if current domino isn't pushed ('.'), we go to the next iteration, as '.' domino doesn't cause any force.
 *      - after the main loop, there can be trailing '.' dominoes if the last pushed domino was 'R'.
 *          Set all trailing '.' dominoes to 'R' in this case.
 * 
 * Time: O(n)   
 * Space: O(n) for `domArray`
 */
function pushDominoes(dominoes: string): string {
    const n = dominoes.length;
    const domArray: string[] = dominoes.split('');
    let pL = -1;

    for (let pR = 0; pR < n; pR++) {
        if (dominoes[pR] === 'R') {
            if (pL !== -1 && dominoes[pL] === 'R') {
                for (let i = pL + 1; i < pR; i++) {
                    domArray[i] = 'R';
                }
            }

            pL = pR;
        } else if (dominoes[pR] === 'L') {
            if (pL === -1 || dominoes[pL] === 'L') {
                for (let i = (pL === -1 ? 0 : pL + 1); i < pR; i++) {
                    domArray[i] = 'L';
                }
            } else {
                let l = pL + 1;
                let r = pR - 1;

                while (l < r) {
                    domArray[l++] = 'R';
                    domArray[r--] = 'L';
                }

                if (l === r) {
                    domArray[l] = '.';
                }
            }

            pL = pR;
        }
    }

    if (pL !== -1 && dominoes[pL] === 'R') {
        for (let i = pL + 1; i < n; i++) {
            domArray[i] = 'R';
        }
    }

    return domArray.join('');
}
