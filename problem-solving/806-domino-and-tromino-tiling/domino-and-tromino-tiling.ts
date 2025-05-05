/**
 * Approach: Dynamic Programming with Tabulation
 * 
 * Look at relation between input and output:
 * input | output
 * 1     | 1
 * 2     | 2
 * 3     | 5
 * 4     | 11
 * 5     | 24
 * 6     | 53
 * and this can be splitted as
 *  1 = 1
 *  2 = 2
 *  5 = 2 * 2 + 1
 * 11 = 5 * 2 + 1
 * 24 = 11 * 2 + 2
 * 53 = 24 * 2 + 5
 * 
 * We can use Dynamic Programming because:
 *      - the problem is built up by overlapping subproblems. 
 *          E.g. to count `numTilings(n)` we need to know `numTilings(n - 1)`.
 *      - our problem has optimal structure where the solution can be constructed from solutions of subproblem
 * 
 * Tabulation technique uses a table where most basic subproblems are prefilled. 
 *      Then we calculate more and more subproblem results (and save them to table) iteratively using basic results 
 *          until we find the result for the main problem.
 *      Tabulation is 'bottom-up' technique because it solves the basic subproblem first.
 * 
 * Basic cases:
 *      - `numTilings(0)` - empty board and only 1 way to tile by doing nothing = `ways[0] = 1`;
 *      - `numTilings(1)` - 2x1 board and only 1 vertical domino can cover this board = `ways[1] = 1`;
 *      - `numTilings(2)` - 2x2 board and 2 possibilities: 2 horizontal or 2 vertical dominoes = `ways[2] = 2`;
 * 
 * ? How to get formulas to solve remaining cases. They're called 'transition functions'.
 * Let's imagine we have some number (e.g. more than 6) of solved subproblems. 
 *      And we add 1 column to board. Combinations to tile:
 *      - add 1 vertical (Y) domino to previous board (`n-1`)
 *      - add 2 horizontal (X) dominoes to pre-previous board (`n-2`). 
 *          But only half from each of those 2 is for 1 column.
 *      - add 2 L-shaped (L) trominoes partially (p) to previous board (`n-1`). 
 *          We add 2 because of symmetrical combinations with L-shaped trominoes.
 *      So, we have: f(n) = 1Y + 2*0.5*X + 2*pL = f(n-1) + 2*0.5*f(n-2) + 2*p(n-1) = f(n-1) + f(n-2) + 2*p(n-1)
 * ? How to express partial tromino:
 *      - add 1 tromino to fully covered board `n-2`
 *      - add 1 horizontal domino to partially covered board `n-1`
 *      So, we have: p(n) = 1L + 1X = f(n-2) + p(n-1)
 * 
 * In order to handle full and partial combinations, 2 containers should be used for tracking.
 * ? How to optimize the transition functions. Let's call `f(n)` above as `E1` and `p(n)` as `E2`.
 *      1) shift both E1 and E2 to the right (-1):
 *          E1: f(n) = f(n-1) + f(n-2) + 2*p(n-1)
 *          E3: f(n-1) = f(n-2) + f(n-3) + 2*p(n-2)
 *          E2: p(n) = f(n-2) + p(n-1)
 *          E4: p(n-1) = f(n-3) + p(n-2)
 *      2) move all `p` to left side of equation:
 *          E4: p(n-1) = f(n-3) + p(n-2)
 *          E5: p(n-1) - p(n-2) = f(n-3)
 *      3) subtract E3 from E1:
 *          E1: f(n) = f(n-1) + f(n-2) + 2*p(n-1)
 *          E3: f(n-1) = f(n-2) + f(n-3) + 2*p(n-2)
 *          E6: f(n) - f(n-1) = (f(n-1) + f(n-2) + 2*p(n-1)) - (f(n-2) + f(n-3) + 2*p(n-2))
 *                            = (f(n-1) + 2*p(n-1)) - (f(n-3) + 2*p(n-2))
 *                            = f(n-1) - f(n-3) + 2*p(n-1) - 2*p(n-2)
 *                            = f(n-1) - f(n-3) + 2*(p(n-1) - p(n-2))
 *      4) use E5 to remove `p(x)` from E6:
 *          E6: f(n) - f(n-1) = f(n-1) - f(n-3) + 2*(p(n-1) - p(n-2))
 *          E5: p(n-1) - p(n-2) = f(n-3)
 *          E7: f(n) - f(n-1) = f(n-1) - f(n-3) + 2*(f(n-3))
 *                            = f(n-1) + f(n-3)
 *      5) express `f(n)` using E7:
 *          E7: f(n) - f(n-1) = f(n-1) + f(n-3)
 *          E8: f(n) = 2 * f(n-1) + f(n-3)
 * And now with single function E8 we can count the ways for remaining part of board [3, n]; 
 * 
 * Time: O(n)
 * Space: O(n)
 */
const MOD: number = 1e9 + 7;

function numTilings(n: number): number {
    const ways = new Int32Array(n + 1);

    ways[0] = 1;
    ways[1] = 1;
    ways[2] = 2;

    for (let i = 3; i <= n; i++) {
        ways[i] = (2 * ways[i - 1] + ways[i - 3]) % MOD;
    }

    return ways[n];
};
