/**
 * Approach: Simulation with
 * - imperative `for`
 * - declarative `includes` and `push`
 * 
 * Time: O(n*m) where `n` and `m` are lengths of array and word accordingly
 * Space: O(1) because returned `indices` is excluded from calculation
 */
function findWordsContaining(words: string[], x: string): number[] {
    const n = words.length;
    const indices: number[] = [];

    for (let i = 0; i < n; i++) {
        const word = words[i];

        if (word.includes(x)) {
            indices.push(i);
        }
    }

    return indices;
};
