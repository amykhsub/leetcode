/**
 * Approach: Dynamic Programming
 * 
 * With iteration through each cell we determine the number of affected enemies if a bomb were placed there.
 * 
 * `grid[row][col] === '0'` condition for bomb placement
 * 
 * Time: O(m*n)
 * Space: O(n)
 */
function maxKilledEnemies(grid: string[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const colHitCount = new Uint8Array(n).fill(0);
    let maxCount = 0;
    let rowHitCount = 0;

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (col === 0 || grid[row][col - 1] === 'W') {
                rowHitCount = 0;

                for (let k = col; k < n; k++) {
                    if (grid[row][k] === 'W') {
                        break;
                    } else if (grid[row][k] === 'E') {
                        rowHitCount++;
                    }
                }
            }

            if (row === 0 || grid[row - 1][col] === 'W') {
                colHitCount[col] = 0;

                for (let k = row; k < m; k++) {
                    if (grid[k][col] === 'W') {
                        break;
                    } else if (grid[k][col] === 'E') {
                        colHitCount[col]++;
                    }
                }
            }

            if (grid[row][col] === '0') {
                maxCount = Math.max(maxCount, rowHitCount + colHitCount[col]);
            }
        }
    }

    return maxCount;
};
