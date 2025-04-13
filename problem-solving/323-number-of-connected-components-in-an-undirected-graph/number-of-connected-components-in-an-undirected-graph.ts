/**
 * Approach: Disjoint Set Union (DSU) / Union-Find
 * 
 * `findRoot` recursively finds the root of the set that p belongs to. 
 *      During the recursion, it updates the parent of each visited node directly to the root. 
 *      This flattens the tree structure, making subsequent findRoot operations faster.
 * `parents[i] = j` means that the parent of node `i` is node `j`. 
 *      If `parents[i] = i`, then `i` is the root of its set.
 * 
 * For each edge, iteration finds the roots of the two connected nodes using the `findRoot` function. 
 * If the roots are different, it means the nodes are in different sets, 
 * and the code performs a `union` operation by setting the parent of one root to the other.
 * "union by size" - the set with the smaller "size" (number of nodes in the set) 
 *      is attached to the root of the set with the larger size.
 * Decrementing the component count `n` whenever two sets are merged.
 * 
 * After processing all edges, the remaining value of `n` represents the number of connected components.
 * 
 * Time: O(m*α(n)), which is practically O(m), where `n` is the number of nodes and `m` is the number of edges.
 *      - iterating through edges O(m)
 *      - findRoot with path compression O(α(n)), where α(n) is the inverse Ackermann function. 
 *          The inverse Ackermann function grows extremely slowly, so it can be considered to be O(1)
 * Space: O(n) is required by `parents` array, where n is the number of nodes.
 */
function countComponents(n: number, edges: number[][]): number {
    function findRoot(parents: number[], p: number): number {
        if (parents[p] !== p) {
            parents[p] = findRoot(parents, parents[p]);
        }

        return parents[p];
    }

    const parents = Array<number>(n);
    const size = Array<number>(n);

    for (let i = 0; i < n; i++) {
        parents[i] = i;
        size[i] = 1;
    }

    for (const edge of edges) {
        let rootA = findRoot(parents, edge[0]);
        let rootB = findRoot(parents, edge[1]);

        if (rootA !== rootB) {
            if (size[rootA] < size[rootB]) {
                [rootA, rootB] = [rootB, rootA];
            }

            parents[rootB] = rootA;
            size[rootA] += size[rootB];
            n--;
        }
    }

    return n;
};
