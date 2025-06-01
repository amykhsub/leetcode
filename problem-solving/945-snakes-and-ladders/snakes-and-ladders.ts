/**
 * Approach: Breadth-First Search (BFS) with
 * - Flattening
 * - Early exit
 * 
 * 2D board is transformed to flatten array `flatBoard` in Boustrophedon order for simple indexing and calculation.
 * 
 * BFS finds the shortest path in unweighted graph which is needed to find minimum number of moves.
 * 
 * `head` and `tail` with Typed Array (of fixed size) are used instead of `shift()` and `push()` of standard array.
 * 
 * `movesToReach` tracks the minimum number of moves required to reach each cell from starting point.
 * 
 * `flatBoard[next] - 1` is used to signify a snake or ladder.
 * 
 * Early exit `next === n2 - 1` because destination has been reached.
 * 
 * Time: O(n²) because flattening the board and BFS costs O(n²) each
 * Space: O(n²) because `flatBoard`, `movesToReach`, `queue` take O(n²) each
 */
function snakesAndLadders(board: number[][]): number {
    const n = board.length;
    const n2 = n * n;
    const flatBoard = new Int16Array(n2);

    for (let row = n - 1, i = 0, isLtr = true; row >= 0; row--, isLtr = !isLtr) {
        if (isLtr) {
            for (let col = 0; col < n; col++) {
                flatBoard[i++] = board[row][col];
            }
        } else {
            for (let col = n - 1; col >= 0; col--) {
                flatBoard[i++] = board[row][col];
            }
        }
    }

    const movesToReach = new Int16Array(n2).fill(-1);
    const queue = new Int16Array(n2);
    let head = 0;
    let tail = 1;

    movesToReach[0] = 0;
    queue[0] = 0;

    while (head < tail) {
        const pointer = queue[head++];
        const movesCount = movesToReach[pointer];

        for (let roll = 1; roll <= 6; roll++) {
            let next = pointer + roll;

            if (next >= n2) {
                break;
            }

            if (flatBoard[next] !== -1) {
                next = flatBoard[next] - 1;
            }

            if (next === n2 - 1) {
                return movesCount + 1;
            }

            if (movesToReach[next] === -1) {
                movesToReach[next] = movesCount + 1;
                queue[tail++] = next;
            }
        }
    }

    return -1;
};
