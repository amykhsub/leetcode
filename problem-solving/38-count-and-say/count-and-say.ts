/**
 * Approach: Recursion with Memoization of digit char position
 * 
 * Time: O(n * m), where `m` is the length of count-and-say string
 * Space: O(n + m), due to storage of generated strings
 */
function countAndSay(n: number): string {
    if (n === 1) {
        return '1';
    }

    const rec = countAndSay(n - 1);
    let acc = '';
    let posMemo = -1;

    for (let i = 0; i < rec.length; i++) {
        const s = rec[i];

        if (s === rec[i + 1]) {
            continue;
        }

        acc += `${i - posMemo}${s}`;
        posMemo = i;
    }

    return acc;
};
