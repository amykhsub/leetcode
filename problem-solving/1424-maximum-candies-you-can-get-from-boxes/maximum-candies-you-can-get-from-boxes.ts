/**
 * Approach: Breadth-First Search (BFS) with
 * - State Management
 * 
 * Breadth-First Search is used to process boxes in shortest path.
 * `queue` stores the labels of boxes that need to be processed.
 * `head` and `tail` pointers are used to manage the queue.
 * 
 * `Uint8Array` is a typed array that stores 8-bit unsigned integers, 
 *      which is memory-efficient for true/false or small integer states (0 or 1 in our case).
 * `hasKey` tracks found keys of boxes.
 * `isVisited` prevents re-processing of boxes that already opened and helps to avoid infinity loops.
 * `isDiscovered` ensures the box is added to queue once, because the same box can be found several times.
 * `isBlocked` tracks the boxes that have been discovered but no key has been found for them.
 * 
 * For main loop:
 *      - if box is already opened, skip it
 *      - if box is closed and we have no key, mark it as blocked and defer
 *      - if `currentBox` can be opened, 
 *          - the loop iterates `keys[currentBox]` to collect keys 
 *              and check whether previously blocked box can be unblocked now and added to queue for evaluation
 *          - iteration through `containedBoxes[currentBox]` allows to add previously non-discovered boxes 
 *              to queue queue for processing.
 * 
 * Time: O(n + k + c) where
 *      - `n` is number of boxes,
 *      - `k` is number of keys across all boxes,
 *      - `c` is number of contained boxes across all boxes
 * Space: O(n)
 */
function maxCandies(
    status: number[],
    candies: number[],
    keys: number[][],
    containedBoxes: number[][],
    initialBoxes: number[]
): number {

    const n = status.length;
    const hasKey = new Uint8Array(n);
    const isVisited = new Uint8Array(n);
    const isDiscovered = new Uint8Array(n);
    const isBlocked = new Uint8Array(n);
    const queue = new Int32Array(n * 2);
    let head = 0;
    let tail = 0;

    for (const box of initialBoxes) {
        if (isDiscovered[box] === 0) {
            isDiscovered[box] = 1;
            queue[tail++] = box;
        }
    }

    let result = 0;

    while (head < tail) {
        const currentBox = queue[head++];

        if (isVisited[currentBox] === 1) {
            continue;
        }

        if (status[currentBox] === 0 && hasKey[currentBox] === 0) {
            isBlocked[currentBox] = 1;
            continue;
        }

        isVisited[currentBox] = 1;
        result += candies[currentBox];

        for (const box of keys[currentBox]) {
            if (hasKey[box] === 0) {
                hasKey[box] = 1;

                if (isBlocked[box] === 1) {
                    queue[tail++] = box;
                }
            }
        }

        for (const innerBox of containedBoxes[currentBox]) {
            if (isDiscovered[innerBox] === 0) {
                isDiscovered[innerBox] = 1;
                queue[tail++] = innerBox;
            }
        }
    }

    return result;
}
