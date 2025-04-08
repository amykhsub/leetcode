/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * Approach: Depth-First Search (DFS), Recursion, Memoization, without objects
 * 
 * LCA - Lowest Common Ancestor.
 *
 * Recursively traversing the tree and calculating the depth of each node.
 * Identifying nodes where the left and right subtrees have the same depth,
 *   which indicates a potential LCA of deepest leaves.
 * Keeping track of the maximum depth encountered and updating the LCA whenever a deeper or equally deep LCA is found.
 * Returning the final LCA that is at the deepest level.
 *
 * Time: O(n), where n is the number of nodes.
 * Space: O(h), where h is the height of the tree, due to the recursive call stack.
 *        In the worst case (a skewed tree), h can be n, making the space complexity O(n).
 *        In a balanced tree, the space complexity is O(log n).
 */
function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
    let lca = root;
    let maxDepth = 0;

    function dfs(n: TreeNode | null, depth: number): number {
        if (!n) return depth;

        const depthL = dfs(n.left, depth + 1);
        const depthR = dfs(n.right, depth + 1);

        if (depthL === depthR && depthL >= maxDepth) {
            lca = n;
            maxDepth = depthL;
        }

        return Math.max(depthL, depthR);
    }

    dfs(root, maxDepth);

    return lca;
};
