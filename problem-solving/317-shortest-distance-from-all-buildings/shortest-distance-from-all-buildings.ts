/**
 * Approach:
 * - Breadth-First Search,
 * - track visits in-place,
 * - flatten arrays for directions and queue
 * 
 * Flatten array for navigation directions (`DIRS`) is used for improved performance and reduced memory access overhead
 *    compared to using an array of coordinate pairs like DIRS = [[-1, 0], [0, -1], [0, 1], [1, 0]].
 * Using adjacent elements (`DIRS[j]`, `DIRS[j + 1]`) involves sequential memory access,
 *    which is generally faster than accessing separate arrays within an array.
 * With an array of coordinate pairs, we need to access `DIRS[j][0]` and `DIRS[j][1]`, requiring an extra level of indirection, which can be slightly slower.
 * Sequential access of the flattened array improves cache locality. The CPU can prefetch the next elements in the array, leading to faster access times.
 *
 * Accessing elements in a flat array (`DIRS[j]`, `queue[i]`) is generally faster than accessing elements in a nested array (`DIRS[j][0]`, `queue[i][j]`).
 *    This is because there is less indirection involved.
 * 
 * The grid itself is modified during the BFS. The grid cells are changed to the `visitMarker` value, and then decremented again.
 * This is a very space efficient way to track visited cells, however it makes the grid data itself become changed and unreadable.
 * By checking if a cell's value matches the decreasing `visitMarker`, the code ensures that the cell has been visited by all prior BFS traversals.
 * 
 * Time: O(m²*n²), where 'm' and 'n' are the dimensions of the grid.
 *       The BFS [O(m∗n)] is performed for each building [O(b∗m∗n), where 'b' is the number of buildings],
 *       and in the worst case, it visits all cells in the grid with O(m²*n²).
 * Space: O(m*n) for the `distances` array and the `queue` in 'bfs'.
 */

const DIRS = [-1, 0, 0, -1, 0, 1, 1, 0];
const BUILDING = 1;

function shortestDistance(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    let minDistance = Infinity;

    // Accumulates the distances from each building to every reachable empty cell, enabling the calculation of the shortest combined distance.
    const distances: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

    // The solution uses negative integer to mark cells that are reachable from all buildings.
    // During BFS, if grid cell matches the current visitMarker, it means that cell has been visited from all the previous buildings
    let visitMarker = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === BUILDING) {
                minDistance = bfs(grid, distances, visitMarker--, i, j);
            }
        }
    }

    return minDistance === Infinity ? -1 : minDistance;
};

function bfs(
    grid: number[][],
    sums: number[][],
    visitMarker: number,
    y: number,
    x: number
): number {
    const m = grid.length;
    const n = grid[0].length;

    const queue = [y, x];
    let minSum = Infinity;

    // This outer loop controls BFS level ('layer') and distance from the starting point, moving outward from the starting building.
    // Each iteration processes all nodes at a specific distance from the starting node.
    for (let dist = 1, q = 0; q < queue.length; dist++) {
        // The inner 'for' loop processes all the nodes at the current distance, exploring their neighbors.
        // We want to process only the nodes that were in the queue at the start of the current level (const N).
        for (const N = queue.length; q < N; q += 2) {
            for (let j = 0; j < DIRS.length; j += 2) {
                y = queue[q] + DIRS[j];
                x = queue[q + 1] + DIRS[j + 1];

                if (y >= 0 && y < m &&
                    x >= 0 && x < n &&
                    grid[y][x] === visitMarker
                ) {
                    --grid[y][x];   // mark the cell as visited from current building.
                    queue.push(y, x);   // add eligible cell to the next level of bfs.
                    sums[y][x] += dist;     // accumulate sum of the distances from each building to each cell.
                    minSum = Math.min(minSum, sums[y][x]);  // keep the shortest path from current building
                }
            }
        }
    }

    return minSum;
}