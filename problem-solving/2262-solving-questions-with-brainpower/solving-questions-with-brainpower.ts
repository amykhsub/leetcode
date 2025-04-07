/**
 * Approach: Top-down Dynamic Programming with Memoization, Recursion, Depth-First Search.
 * 
 * `dp` array stores the maximum points achievable from each question index onwards.
 *     This is a memoization technique to avoid redundant calculations.
 * 
 * `dfs` helper calculates the maximum points starting from a given question index `i`
 *     and returns the maximum points achievable.
 * 
 * `if (i >= questions.length)` - base case of recursion. `true` means we reached the end of question list.
 * `if (dp[i]) return dp[i]` - memoization step.
 * 
 * `dp[i] = Math.max(...)` is core of Dynamic Programming approach. `Math.max(...)` represents the best choice.
 * - The 1st argument Math.max(<solve>, ...) represents the case to solve the question.
 *       We add current question points and recursively call `dfs` skipping the required number of questions.
 * - The 2nd argument Math.max(..., <skip>) represents the case to skip the current question `i`,
 *       recursively call `dfs` for the next question.
 * 
 * Time: O(n). The `dfs` function is called at most once for each index `i` due to memoization.
 * Space: O(n). It requires O(n) space to store he results for each subproblem.
 */
let dp: number[];

const dfs = (questions: number[][], i: number): number => {
    if (i >= questions.length) return 0;
    if (dp[i]) return dp[i];
    
    dp[i] = Math.max(
        questions[i][0] + dfs(questions, i + questions[i][1] + 1),
        dfs(questions, i + 1)
    )
    
    return dp[i];
};

function mostPoints(questions: number[][]): number {
    dp = Array<number>(questions.length);
    
    return dfs(questions, 0);
};
