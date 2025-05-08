/**
 * Approach: Breadth-First Search (BFS) with
 * - flatten arrays for directions and queue
 *
 * Flatten array for navigation directions (`DIRS`) is used for improved performance and reduced memory access overhead
 *    compared to using an array of coordinate pairs like DIRS = [[-1, 0], [0, -1], [0, 1], [1, 0]].
 * 
 * `minTimes` is used to store the minimum time to reach each room.
 * 
 * BFS explores data starting from point [0, 0] with time 0. It takes a room from queue, checks neighbors,
 *      and adds valid neighbors with updated time.
 * `queue` is used to track the order of rooms to visit.
 * `queue[i]` represents the coordinates of room and time to reach the room (row, column, time).
 * 
 * We can only start moving to room `(ar, ac)` at or after `moveTime[ar][ac]`.
 * The earliest time we can arrive from `(r, c)` at time `t` to neighbor `(ar, ac)` 
 *      is `Math.max(moveTime[ar][ac], t) + 1`.
 * 
 * Outer loop processes all nodes at current time level.
 * Inner loop iterates through current level's nodes.
 * `nextQueue` accumulates the neighbors for the next step.
 * 
 * Time: O(n*m)
 *      - moveTime grid has n*m number of cells
 *      - for outer loop at worst case every cell can be added to queue and processed by inner loop
 * Space: O(n*m) for `minTimes`, `queue`, `nextQueue`
 */
function minTimeToReach(moveTime: number[][]): number {
    const n = moveTime.length;
    const m = moveTime[0].length;
    const DIRS = [0, 1, 0, -1, 1, 0, -1, 0];
    const minTimes: number[][] = Array.from({ length: n }, () => new Array(m).fill(Infinity));
    let queue: number[][] = [[0, 0, 0]];

    while (queue.length) {
        const nextQueue: number[][] = [];

        while (queue.length) {
            const [r, c, t] = queue.pop()!;

            if (minTimes[r][c] > t) {
                minTimes[r][c] = t;

                for (let i = 0; i < DIRS.length; i += 2) {
                    const ar = r + DIRS[i];
                    const ac = c + DIRS[i + 1];
    
                    if (
                        ar >= 0 && ac >= 0 &&
                        ar < n && ac < m &&
                        minTimes[ar][ac] > t + 1
                    ) {
                        const at = Math.max(moveTime[ar][ac], t) + 1;
    
                        nextQueue.push([ar, ac, at]);
                    }
                }
            };
        }

        queue = nextQueue;
    }

    return minTimes[n - 1][m - 1];
};
