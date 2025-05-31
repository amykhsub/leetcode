/**
 * Approach: Breadth-First Search (BFS) with
 * - Cycle Detection (Visited Array)
 * - Early Termination
 * 
 * `node1Distances` is a distance map. -1 indicates unvisited nodes.
 *      The first graph traversal stores the distance from `node1` to `pointer`.
 *      `node1Distances[pointer] === -1` checks whether the node is visited or not, which indicate a cycle.
 * 
 * `dist` tracks the distance from starting node (1 or 2) during traversal.
 * 
 * `node2Visits` explicitly marks node2 as visited.
 * 
 * `dist1 >= 0` means the node is reachable from both `node1` and `node2`
 * `maxDist < minMaxDist` means we have found better candidate for closest meeting node.
 * 
 * Time: O(n) because both of loops costs O(n) each
 * Space: O(n) because `node1Distances` and `node2Visits` take O(n) space each.
 */
function closestMeetingNode(edges: number[], node1: number, node2: number): number {
    const n = edges.length;
    const node1Distances = new Int32Array(n).fill(-1);
    let pointer = node1;
    let dist = 0;

    while (pointer !== -1 && node1Distances[pointer] === -1) {
        node1Distances[pointer] = dist;
        pointer = edges[pointer];
        dist++;
    }

    const node2Visits = new Uint8Array(n);
    let closestNode = -1;
    let minMaxDist = n;

    pointer = node2;
    dist = 0;

    while (pointer !== -1 && node2Visits[pointer] === 0) {
        node2Visits[pointer] = 1;

        const dist1 = node1Distances[pointer];

        if (dist1 >= 0) {
            const maxDist = dist1 > dist ? dist1 : dist;

            if (maxDist < minMaxDist || (maxDist === minMaxDist && pointer < closestNode)) {
                minMaxDist = maxDist;
                closestNode = pointer;
            }
        }

        pointer = edges[pointer];
        dist++;
    }

    return closestNode;
}
