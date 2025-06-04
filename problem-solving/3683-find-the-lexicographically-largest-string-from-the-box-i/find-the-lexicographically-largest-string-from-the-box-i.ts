/**
 * Approach: Enumeration
 * 
 * Time: O(n2) because of 'for' loop and substring
 * Space: O(n)
 */
function answerString(word: string, numFriends: number): string {
    if (numFriends === 1) {
        return word;
    }

    const n = word.length;
    let largest = "";

    for (let i = 0; i < n; ++i) {
        const sub = word.substring(i, i + n - numFriends + 1);

        if (sub > largest) {
            largest = sub;
        }
    }

    return largest;
};
