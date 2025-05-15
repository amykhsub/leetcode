/**
 * Approach: Greedy
 * 
 * The algorithm is greedy if making the locally optimal choice at each step helps to find a global optimum.
 * The choice is locally optimal because the step doesn't look ahead to see 
 *      if skipping this word might allow for a longer alternating subsequence later on.
 *      It never goes back to reconsider that decision.
 *      It doesn't check alternative subsequences that can formed by skipping the current word.
 * 
 * Time: O(n)
 * Space: O(1)
 */
function getLongestSubsequence(words: string[], groups: number[]): string[] {
    const result: string[] = [words[0]];
    let lastGroup = groups[0];

    for (let i = 1; i < groups.length; i++) {
        if (groups[i] !== lastGroup) {
            result.push(words[i]);
            lastGroup = groups[i];
        }
    }

    return result;
};
