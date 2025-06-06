/**
 * Approach: Disjoint Set Union (DSU) / Union-Find Data Structure with
 * - memory optimization
 * 
 * DSU is used to get equivalence classes of characters.
 * `find(x)` is used to find the root of set that element `x` belongs to and connects `x` to that root.
 * `union(x, y)` performs union by value instead of union by rank/size. 
 *      It updates the root of smaller value (fx, fy) with root of larger value 
 *          in order to have a smaller character as a root of merged set.
 * 
 * `state` represents DSU where each index `i` (`0-25` for `a-z`) stores a root of character.
 *      Initially each character is a root of itself (`(_, i) => i`).
 *      `Uint8Array` is used for memory optimization.
 * 
 * Time: O(n+m) where `m` is length of `s1`,`s2` and `n` is length of `baseStr`
 * Space: O(n)
 */
function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {
    const ALPHABET_SIZE = 26;
    const A_CODE = 'a'.charCodeAt(0);
    const state = Uint8Array.from({ length: ALPHABET_SIZE }, (_, i) => i);

    function find(x: number): number {
        if (state[x] !== x) {
            state[x] = find(state[x])
        };

        return state[x];
    }

    function union(x: number, y: number): void {
        const fx = find(x);
        const fy = find(y);

        if (fx === fy) {
            return;
        }

        if (fx < fy) {
            state[fy] = fx;
        } else {
            state[fx] = fy;
        }
    }

    for (let i = 0; i < s1.length; i++) {
        const c1 = s1.charCodeAt(i) - A_CODE;
        const c2 = s2.charCodeAt(i) - A_CODE;

        union(c1, c2);
    };

    let result = '';

    for (const c of baseStr) {
        const charN = c.charCodeAt(0) - A_CODE;
        const char = String.fromCharCode(find(charN) + A_CODE);

        result += char;
    }

    return result;
};
