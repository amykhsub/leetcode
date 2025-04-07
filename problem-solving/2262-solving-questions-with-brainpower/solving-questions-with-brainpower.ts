/**
 * Approach: Bottom-Up Dynamic Programming, Iterative.
 * 
 * The loop iterates backward from the second-to-last question to the 1st question.
 * Iteration initialized with points for current question, calculates the index of the next question.
 * If the index in scope of questions, add those points to current question weight,
 *    and make sure with Math.max(...) that each i+1 question includes weight of follow questions.
 * 
 * Time:  O(n). Questions iteration
 * Space: O(n). It requires O(n) space to store the maximum points for each subproblem
 */
function mostPoints(questions: number[][]): number {
    const n = questions.length;
    const dp = Array<number>(n);
    let i = n - 1;
    
    dp[i] = questions[i][0];

    for (--i; i >= 0; i--) {
        dp[i] = questions[i][0];
        
        const nextId = i + questions[i][1] + 1;
        
        if (nextId < n) dp[i] += dp[nextId];

        dp[i] = Math.max(dp[i], dp[i+1]);
    }

    return dp[0];
};
